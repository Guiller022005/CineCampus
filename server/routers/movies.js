// server/routers/movies.js
const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

/**
 * Rutas para gestionar las películas.
 * 
 * @module routers/movies
 * @description
 * *Define las rutas para obtener películas. Las rutas disponibles son:
 * *- `GET /cartelera`: Obtiene las películas en cartelera.
 * *- `GET /:id`: Obtiene una película por ID.
 * *- `GET /`: Obtiene todas las películas.
 * * @param {Request} req - La solicitud HTTP.
 * *@param {Response} res - La respuesta HTTP.
 * *@param {Function} next - El siguiente middleware.
 */

// // Ruta para obtener todas las películas
// router.get('/', moviesController.getMovies);

// Ruta para obtener todas las peliculas en cartelera
router.get('/cartelera', moviesController.obtenerPeliculasEnCartelera);

// Ruta para obtener una película por ID
router.get('/:id', moviesController.obtenerPeliculaPorId);

// Ruta para obtener todas las películas
router.get('/', moviesController.listarPeliculas);

module.exports = router;
