/**
 * @file movies.js
 * @description Archivo que define las rutas para las operaciones relacionadas con las películas en la API.
 * Utiliza el enrutador de Express para manejar las solicitudes y delega la lógica a un controlador.
 */

const express = require('express'); // Importacion del framework Express
const router = express.Router(); // Crea una instancia del enrutador
const moviesController = require('../controllers/moviesController'); // Importa el controlador de películas

/**
 * @function router.get
 * @description Define una ruta para manejar las solicitudes GET a la ruta raíz de '/api/movies'.
 * Esta ruta invoca el método `getMovies` del controlador `moviesController`.
 * 
 * @param {string} '/' - La ruta relativa para la solicitud GET.
 * @param {Function} moviesController.getMovies - Método del controlador que maneja la lógica para obtener las películas.
 * 
 * @returns {void}
 */
router.get('/', moviesController.getMovies);// Obtener todas las películas

/**
 * @module router
 * @description Exporta el enrutador de Express configurado para manejar las solicitudes relacionadas con las películas.
 */

module.exports = router;