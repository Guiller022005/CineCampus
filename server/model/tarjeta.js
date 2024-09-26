const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tarjetaSchema = new Schema({
  fechaExpedicion: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['activa', 'inactiva', 'bloqueada'],
    required: true
  },
  iduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema, 'tarjeta');
module.exports = Tarjeta;
