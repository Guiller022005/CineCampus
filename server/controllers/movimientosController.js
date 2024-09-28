// controllers/movimientosController.js
const { body, validationResult } = require('express-validator');
const Movimiento = require('../models/movimiento');
const User = require('../models/user'); // Asegúrate de tener el modelo del usuario importado
const { ObjectId } = require('mongodb');


/**
 * @function crearMovimiento
 * @description Crea un nuevo movimiento en la base de datos.
 * @param {Object} req - El objeto de solicitud de Express que contiene los datos del movimiento.
 * @param {Object} res - El objeto de respuesta de Express para enviar la respuesta al cliente.
 * @returns {void} Responde con un mensaje de éxito o error.
 */
exports.crearMovimiento = async (req, res) => {
  try {
    const { idUser, tipo, idFuncion } = req.body; // Asumiendo que el cliente envía estos datos

    // Verificar si el usuario existe en la colección `user`
    const usuario = await User.findById(idUser);

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'El usuario no existe en la colección',
      });
    }

    // Crear el objeto con los datos a insertar
    const nuevoMovimiento = new Movimiento({
      idUser: idUser,
      tipo,
      idFuncion: idFuncion,
    });

    // Insertar el nuevo movimiento en la colección
    const resultado = await nuevoMovimiento.save();

    // Enviar una respuesta exitosa con el resultado
    res.status(201).json({
      mensaje: 'Movimiento creado con éxito',
      movimiento: resultado,
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear el movimiento:', error.message);
    res.status(500).json({
      mensaje: 'Error al crear el movimiento',
      error: error.message,
    });
  }
};

/**
 * @function listarMovimientos
 * @description Obtiene todos los movimientos de la base de datos.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express para enviar la lista de movimientos.
 * @returns {void} Responde con la lista de movimientos o un mensaje de error.
 */
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
