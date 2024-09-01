// routes/movimiento.js
const express = require('express');
const router = express.Router();
const { crearMovimiento, listarMovimientos } = require('../controllers/movimientosController');

// Definir la ruta para crear un nuevo movimiento
router.post('/crear', crearMovimiento);

// Definir la ruta para listar todos los movimientos
router.get('/', listarMovimientos);

module.exports = router;

