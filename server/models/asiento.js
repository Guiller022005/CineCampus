const mongoose = require('mongoose');
const { Schema } = mongoose;

const asientoSchema = new Schema({
  id_sala: {
    type: mongoose.Schema.Types.ObjectId, // Uso correcto para Mongoose
    required: true
  },
  tipo: {
    type: String,
    enum: ['estandar', 'preferencial'],
    required: true
  },
  fila: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Asiento', asientoSchema, 'asiento');