// server/routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Ruta para obtener todos los usuarios
router.get('/', usersController.obtenerUsuarios);

module.exports = router;