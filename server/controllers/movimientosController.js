// controllers/movimientosController.js
const { body, validationResult } = require('express-validator');
const Movimiento = require('../models/movimiento');
const { ObjectId } = require('mongodb');

exports.crearMovimiento = async (req, res) => {
  try {
    // Crear el objeto con los datos a insertar
    const nuevoMovimiento = {
      iduser: new ObjectId("66d5a9622d4f9ce31912abd1"),
      tipo: "reserva",
      idFuncion: new ObjectId("66d0e536d6820d3b3181a8cd"),
    };

    // Insertar el nuevo movimiento en la colección
    const resultado = await collection.insertOne(nuevoMovimiento);

    if (!resultado.acknowledged) {
      throw new Error('Error al insertar el movimiento. Por favor, intenta de nuevo.');
    }

    // Enviar una respuesta exitosa con el resultado
    res.status(201).json({
      mensaje: 'Movimiento creado con éxito',
      movimiento: resultado
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear el movimiento:', error.message);
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
