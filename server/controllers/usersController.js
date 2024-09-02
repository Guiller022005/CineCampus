const user = require('../models/user'); 

/**
 * Controlador para obtener todos los usuarios de la base de datos.
 *
 * @async
 * @function obtenerUsuarios
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {void} - Devuelve una respuesta JSON con los usuarios obtenidos o un mensaje de error.
 */
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await user.find();
        console.log('Usuarios obtenidos: ', usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: error.message });
    }
};
