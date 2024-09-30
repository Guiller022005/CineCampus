const express = require('express');
const router = express.Router();
const asientosController = require('../controllers/asientosController');

// Ruta para obtener todos los asientos
router.get('/asiento', asientosController.getAllAsientos);

// Ruta para obtener funciones por ID de película
router.get('/asientosByfuncion/:idPelicula', asientosController.obtenerFuncionesPorIdPelicula);


module.exports = router;