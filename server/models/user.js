const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define los roles permitidos
const rolesPermitidos = ['VIP', 'estandar', 'adminRole'];

const userSchema = new Schema({
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    rol: { 
        type: String, 
        enum: rolesPermitidos, // Lista de roles permitidos
        required: true 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
