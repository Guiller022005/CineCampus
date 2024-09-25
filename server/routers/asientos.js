const express = require('express');
const router = express.Router();
const asientosController = require('../controllers/asientosController');

// Ruta para obtener todos los asientos
router.get('/asiento', asientosController.getAllAsientos);

// Ruta para obtener asientos disponibles para funciones
router.get('/asientos-disponibles-por-funcion/:id_funcion', asientosController.obtenerAsientosDisponiblesPorFunciones);


module.exports = router;
