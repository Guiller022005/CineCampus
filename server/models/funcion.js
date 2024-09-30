const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asientoSchema = new Schema({
    asiento: {
        type: Schema.Types.ObjectId,
        ref: 'Asiento', // Suponiendo que tienes un modelo Asiento
        required: true
    },
    estado: {
        type: String,
        enum: ['ocupado', 'disponible'],
        default: 'disponible'
    }
});

const funcionSchema = new Schema({
    idPelicula: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula',
        required: true
    },
    idSala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        required: true
    },
    fecha: {
        type: String, // Considera usar Date para un mejor manejo
        required: true
    },
    hora: [{
        time: {
            type: String, // Mantener como String, o considerar un formato más adecuado
            required: true
        },
        price: {
            type: Number, // Cambiar a Number para manejar precios
            required: true
        }
    }],
    asientos: [asientoSchema]
});

module.exports = mongoose.model('Funcion', funcionSchema, 'funcion');