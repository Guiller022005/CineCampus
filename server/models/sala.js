// models/sala.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaSchema = new Schema({
    nombre: { type: String, required: true },
    capacidad: { type: Number, required: true },
    precio: { type: Number, required: true }
}, { collection: 'salaCinema' }); // Especifica el nombre de la colección

module.exports = mongoose.model('Sala', salaSchema);