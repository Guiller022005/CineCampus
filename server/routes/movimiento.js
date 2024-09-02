const express = require('express');
const router = express.Router();
const { crearMovimiento, listarMovimientos } = require('../controllers/movimientosController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Ruta para crear un nuevo movimiento (requiere autenticación)
router.post('/crear', ensureAuthenticated, crearMovimiento);

// Ruta para listar todos los movimientos (requiere autenticación)
router.get('/', ensureAuthenticated, listarMovimientos);

module.exports = router;
