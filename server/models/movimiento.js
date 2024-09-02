// models/movimiento.js
const mongoose = require('mongoose');

const movimientoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['compra', 'reserva'],
    required: true
  },
  idFuncion: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Funcion' // Asegúrate de que el modelo Funcion esté definido
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Asegúrate de que el modelo User esté definido
  }
}, { timestamps: true });

module.exports = mongoose.model('Movimiento', movimientoSchema, 'movimiento');
