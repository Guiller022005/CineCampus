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

/**
 * Controlador para obtener usuarios filtrados por rol.
 *
 * @async
 * @function obtenerUsuariosByRol
 * @param {Object} req - Objeto de solicitud (request) value define el rol a filtrar 'VIP' o 'estandar' descomenta el q necesitas usar .
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {void} - Devuelve una respuesta JSON con los usuarios filtrados por rol o un mensaje de error.
 */


exports.obtenerUsuariosByRol = async (req, res) => {
    try {
        // const value = 'VIP';
        const value = 'estandar';
        const usuarios = await user.find({ rol: value }); // Obtén todas las películas
        console.log('Usuarios obtenidas:', usuarios); // Imprime en consola para depuración
        res.status(200).json(usuarios); // Devuelve las películas en formato JSON
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // Imprime el error en consola
        res.status(500).json({ error: error.message }); // Devuelve un error si ocurre
    }
};