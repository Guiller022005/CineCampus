const Ticket = require('../models/ticket');
const Usuario = require('../models/user'); // Importa el modelo de Usuarios
const Movimiento = require('../models/movimiento'); // Importa el modelo de Movimiento
const Funcion = require('../models/funcion'); // Importa el modelo de Funcion
const Sala = require('../models/sala'); // Importa el modelo de Sala


// Obtener todas las boletas
/**
 * Obtiene todas las boletas de la colección `Ticket`.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
exports.getAllTickets = async (req, res) => {
  try {
    const boletas = await Ticket.find();
    console.log('Boletas obtenidas:', boletas);
    res.status(200).json(boletas);
  } catch (error) {
    console.error('Error al obtener las boletas:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// Crear una nueva boleta
/**
 * Crea una nueva boleta y la guarda en la colección `Ticket`.
 * Verifica que el `idMovimiento` exista, la función asociada con el movimiento,
 * la sala asociada con la función, y actualiza el estado de los asientos.
 * También aplica un posible descuento basado en la tarjeta activa del usuario.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
// Función para obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {
  try {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
          throw new Error('Usuario no encontrado');
      }
      return usuario;
  } catch (error) {
      throw new Error(error.message || 'Error al obtener el usuario');
  }
};

// Función para crear una boleta con posible descuento si el usuario tiene rol VIP
exports.createTicket = async (req, res) => {
  try {
      const { idMovimiento, idUsuario, asientos, fecha, estadoCompra } = req.body;

      // Verificar que el idMovimiento existe
      const movimiento = await Movimiento.findById(idMovimiento);
      if (!movimiento) {
          return res.status(404).json({ message: 'Movimiento no encontrado' });
      }

      // Buscar la función asociada con el idMovimiento
      const funcion = await Funcion.findById(movimiento.idFuncion);
      if (!funcion) {
          return res.status(404).json({ message: 'Función no encontrada para el movimiento proporcionado' });
      }

      // Obtener la sala asociada con la función
      const sala = await Sala.findById(funcion.idSala);
      if (!sala) {
          return res.status(404).json({ message: 'Sala no encontrada' });
      }

      // Verificar y actualizar el estado de cada asiento
      const asientosOcupados = [];
      for (let idAsiento of asientos) {
          const asientoIndex = funcion.asientos.findIndex(a => a.asiento.toString() === idAsiento);
          if (asientoIndex === -1) {
              return res.status(404).json({ message: `Asiento ${idAsiento} no encontrado en la función` });
          }
          if (funcion.asientos[asientoIndex].estado !== 'disponible') {
              return res.status(400).json({ message: `El asiento ${idAsiento} no está disponible` });
          }
          funcion.asientos[asientoIndex].estado = 'ocupado';
          asientosOcupados.push(idAsiento);
      }

      // Guardar la función con los asientos actualizados
      await funcion.save();

      // Obtener el usuario que realiza la compra
      const usuario = await obtenerUsuarioPorId(idUsuario);
      if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Calcular el total a pagar basado en el precio base de la sala
      const precioBase = sala.precio;
      let totalFinal = precioBase * asientos.length;
      let descuentoAplica = 'no aplica';

      // Verificar si el usuario tiene el rol VIP para aplicar el descuento del 20%
      if (usuario.rol === 'VIP') {
          descuentoAplica = 'aplica';
          totalFinal = totalFinal * 0.8;  // Aplicar 20% de descuento
      }

      // Crear y guardar la nueva boleta con todos los asientos comprados y el descuento aplicado
      const boleta = new Ticket({
          idMovimiento,
          asientos: asientosOcupados,
          fecha,
          totalAPagar: totalFinal,
          estadoCompra: estadoCompra || 'Completado',
          descuento: descuentoAplica
      });

      await boleta.save();

      res.status(201).json(boleta);
  } catch (error) {
      console.error('Error al crear la boleta:', error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener una boleta por ID
/**
 * Obtiene una boleta específica por su ID.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const boleta = await Ticket.findById(id);

    if (!boleta) {
      return res.status(404).json({ message: 'Boleta no encontrada' });
    }

    console.log('Boleta obtenida:', boleta);
    res.status(200).json(boleta);
  } catch (error) {
    console.error('Error al obtener la boleta:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar una boleta por ID
/**
 * Actualiza una boleta específica por su ID con la información proporcionada.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
exports.updateTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const boletaActualizada = await Ticket.findByIdAndUpdate(id, req.body, { new: true });

    if (!boletaActualizada) {
      return res.status(404).json({ message: 'Boleta no encontrada' });
    }

    console.log('Boleta actualizada:', boletaActualizada);
    res.status(200).json(boletaActualizada);
  } catch (error) {
    console.error('Error al actualizar la boleta:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};