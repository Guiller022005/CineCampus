// controllers/moviesController.js
const Pelicula = require('../models/movie'); // Asegúrate de que la ruta es correcta

/**
 * Controlador para manejar las operaciones relacionadas con películas.
 * 
 * @module controllers/moviesController
 * @requires ../models/movie
 * 
 * @description
 * Este módulo exporta funciones para gestionar las películas, incluyendo obtener todas las películas en cartelera,
 * obtener una película por ID y listar todas las películas con información adicional.
 */

// exports.getMovies = async (req, res) => {
//   try {
//     const peliculas = await Pelicula.find(); // Obtén todas las películas
//     console.log('Películas obtenidas:', peliculas); // Imprime en consola para depuración
//     res.status(200).json(peliculas); // Devuelve las películas en formato JSON
//   } catch (error) {
//     console.error('Error al obtener películas:', error); // Imprime el error en consola
//     res.status(500).json({ error: error.message }); // Devuelve un error si ocurre
//   }
// };

/**
 * Obtiene todas las películas que están en cartelera.
 * 
 * @function
 * @name obtenerPeliculasEnCartelera
 * @memberof module:controllers/moviesController
 * @param {Request} req - La solicitud HTTP.
 * @param {Response} res - La respuesta HTTP.
 * @param {Function} next - El siguiente middleware.
 * @return {Promise<void>} - Responde con un JSON que contiene la lista de películas en cartelera.
 * @throws {Error} - Lanza un error si ocurre algún problema al obtener las películas.
 */

exports.obtenerPeliculasEnCartelera = async (req, res) => {
    try {
        const peliculas = await Pelicula.find({ estado: "cartelera" }); // Obtén todas las películas
        console.log('Películas obtenidas:', peliculas); // Imprime en consola para depuración
        res.status(200).json(peliculas); // Devuelve las películas en formato JSON
    } catch (error) {
        console.error('Error al obtener películas:', error); // Imprime el error en consola
        res.status(500).json({ error: error.message }); // Devuelve un error si ocurre
    }
};

/**
 * Obtiene una película específica por su ID.
 * 
 * @function
 * @name obtenerPeliculaPorId
 * @memberof module:controllers/moviesController
 * @param {Request} req - La solicitud HTTP con un parámetro `id` en la URL.
 * @param {Response} res - La respuesta HTTP.
 * @param {Function} next - El siguiente middleware.
 * @return {Promise<void>} - Responde con un JSON que contiene los detalles de la película con el ID especificado.
 * @throws {Error} - Lanza un error si ocurre algún problema al obtener la película o si no se encuentra la película con el ID proporcionado.
 */

exports.obtenerPeliculaPorId = async (req, res) => {
    try {
        const { id } = req.params; // Obtén el ID de los parámetros de la solicitud
        if (!id) {
            return res.status(400).json({ error: 'ID es requerido' }); // Valida si el ID está presente
        }

        const pelicula = await Pelicula.findById(id); // Busca la película por ID
        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' }); // Maneja el caso en que no se encuentra la película
        }

        res.status(200).json(pelicula); // Devuelve la película en formato JSON
    } catch (error) {
        console.error('Error al obtener la película:', error); // Imprime el error en consola
        res.status(500).json({ error: error.message }); // Devuelve un error si ocurre
    }
};

/**
 * Lista todas las películas con información adicional, incluyendo funciones y horarios.
 * 
 * @function
 * @name listarPeliculas
 * @memberof module:controllers/moviesController
 * @param {Request} req - La solicitud HTTP.
 * @param {Response} res - La respuesta HTTP.
 * @param {Function} next - El siguiente middleware.
 * @return {Promise<void>} - Responde con un JSON que contiene la lista completa de películas con funciones y horarios.
 * @throws {Error} - Lanza un error si ocurre algún problema al listar las películas.
 */

exports.listarPeliculas = async (req, res) => {
    try {
      const peliculas = await Pelicula.aggregate([
        {
          "$lookup": {
            "from": "funcion",
            "localField": "_id",
            "foreignField": "idPelicula",
            "as": "funcion"
          }
        },
        {
          "$unwind": "$funcion"
        },
        {
          "$unwind": "$funcion.hora"
        },
        {
          "$project": {
            "_id": 0,
            "titulo": 1,
            "sinopsis": 1,
            "genero": 1,
            "img": 1,
            "reparto": 1,
            "trailer": 1,
            "estado": 1,
            "fecha": "$funcion.fecha",
            "inicio": "$funcion.hora"
          }
        }
      ]);
      
      res.status(200).json(peliculas); // Devuelve las películas en formato JSON
    } catch (error) {
      console.error('Error al listar películas:', error); // Imprime el error en consola
      res.status(500).json({ error: error.message }); // Devuelve un error si ocurre
    }
  };