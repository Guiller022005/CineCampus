// models/pelicula.js
const mongoose = require('mongoose');

const repartoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  personaje: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

const peliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  genero: {
    type: [String],
    required: true
  },
  duracion: {
    type: Number,  // Puedes usar Number si tienes la duración en minutos
    default: null,
    required: true
  },
  sinopsis: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  reparto: [repartoSchema],  // Array de documentos de reparto
  trailer: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['cartelera', 'no disponible', 'proximamente'],
    required: true
  }
});

module.exports = mongoose.model('Pelicula', peliculaSchema, 'pelicula');
