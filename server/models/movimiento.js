const mongoose = require('mongoose');

const movimientoSchema = new mongoose.Schema({
  idCliente: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al cliente que hace la compra o reserva
    required: true,
    ref: 'Cliente' // Nombre del modelo al que hace referencia
  },
  tipo: {
    type: String,
    enum: ['compra', 'reserva'], // Tipos permitidos
    required: true
  },
  idFuncion: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a la función de la película
    required: true,
    ref: 'Funcion' // Nombre del modelo al que hace referencia
  }
}, {
  timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Movimiento', movimientoSchema, 'movimiento');
