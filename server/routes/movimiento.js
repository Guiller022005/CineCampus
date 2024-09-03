// routes/movimiento.js
const express = require('express');
const router = express.Router();
const { crearMovimiento, listarMovimientos } = require('../controllers/movimientosController');
// const { ensureAuthenticated } = require('../middlewares/auth'); // Si usas autenticación, asegúrate de usar este middleware

// Ruta para crear un nuevo movimiento
router.post('/', crearMovimiento); // Cambiado a '/' para coincidir con la URL base

// Ruta para listar todos los movimientos
router.get('/', listarMovimientos);

module.exports = router;
