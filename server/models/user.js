const mongoose = require('mongoose');

// Definimos el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true,
    enum: ['VIP', 'estandar', 'admin']
  }
});

// Creamos el modelo basado en el esquema
module.exports = mongoose.model('User', usuarioSchema, 'user');
