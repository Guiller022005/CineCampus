/**
 * @file moviesController.js
 * @description Archivo que define los métodos del controlador para manejar las operaciones relacionadas con las películas.
 * Exporta las funciones que responden a las solicitudes relacionadas con las películas.
 * 
 * @module moviesController
 */

/**
 * @function getMovies
 * @description Maneja las solicitudes para obtener todas las películas.
 * Responde con un mensaje estático que indica que se están obteniendo todas las películas.
 * 
 * @param {Object} req - El objeto 'req' contiene informacion sobre la solicitud realizada.
 * @param {Object} res - El objeto 'res' envia una respuesta al cliente.
 * 
 * @returns {void}
 */

exports.getMovies = (req, res) => {
    res.send('Obteniendo todas las peliculas');
};