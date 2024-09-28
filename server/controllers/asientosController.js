const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Asiento = require('../models/asiento');
const Funcion = require('../models/funcion');

// Controlador para obtener todos los asientos
exports.getAllAsientos = async (req, res) => {
  try {
    const asientos = await Asiento.find();
    console.log('Asientos obtenidos:', asientos);
    res.status(200).json(asientos);
  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.obtenerFuncionesPorIdPelicula = async (req, res) => {
    try {
        const idPelicula = req.params.idPelicula;
        const asientos = await Funcion.find({ idPelicula: idPelicula });

        if (asientos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron asientos para este ID de película.' });
        }

        res.status(200).json(asientos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};