const Movimiento = require('../models/movimiento');
const mongoose = require('mongoose');

exports.crearMovimiento = async (req, res) => {
    try {
        // Valores estáticos para prueba
        const idCliente = "66d07916a20753a6ddd155e5";
        const idFuncion = "66d0e536d6820d3b3181a8cd";
        const tipo = "compra";

        // Crear el objeto con los datos
        const nuevoMovimiento = {
            idCliente: mongoose.Types.ObjectId.createFromHexString(idCliente),
            tipo,
            idFuncion: mongoose.Types.ObjectId.createFromHexString(idFuncion),
        };

        // Inserta el nuevo movimiento en la base de datos
        const resultado = await Movimiento.create(nuevoMovimiento);

        // Envía una respuesta exitosa con el resultado
        res.status(201).json({
            mensaje: 'Movimiento creado con éxito',
            movimiento: resultado
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al crear el movimiento:', error);
        res.status(500).json({
            mensaje: 'Error al crear el movimiento',
            error: error.message
        });
    }
};

  
exports.listarMovimientos = async (req, res) => {
    try {
      // Obtener todos los movimientos de la base de datos
      const movimientos = await Movimiento.find();
      
      // Enviar una respuesta exitosa con la lista de movimientos
      res.status(200).json({
        mensaje: 'Movimientos obtenidos con éxito',
        movimientos
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error al recuperar los movimientos:', error);
      res.status(500).json({
        mensaje: 'Error al recuperar los movimientos',
        error: error.message
      });
    }
};
