const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    idMovimiento: {
      type: Schema.Types.ObjectId,
      ref: 'Movimiento',
      required: true
    },
    asientos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Asiento',
        required: true
      }
    ],
    fecha: {
      type: String,
      required: true
    },
    totalAPagar: {
      type: Number,
      required: true
    },
    estadoCompra: {
      type: String,
      enum: ['Completado', 'Cancelado'],
      default: 'Completado'
    }
  });
  
  const Ticket = mongoose.model('Boleta', ticketSchema, 'boleta');
  module.exports = Ticket;