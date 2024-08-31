// app.js
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const express = require('express'); // Framework para manejar el servidor
const connectDB = require('./server/config/db'); // Importa la función de conexión a la base de datos MongoDB
const movies = require('./server/routes/movies'); // Importa rutas de películas

const app = express(); // Instancia

/**
 * @function connectDB
 * @description Establece la conexión con la base de datos MongoDB utilizando la configuración en la variable de entorno.
 * Se llama al inicio de la aplicación para asegurar que la base de datos esté disponible antes de recibir solicitudes.
 */

connectDB(); // Conecta a la base de datos

app.use(express.json()); // Middleware para manejar JSON



app.get('/', (req, res) => res.send('API funcionando')); // Ruta raíz para verificar la API

/**
 * @function
 * @name app.use('/api/movies', movies)
 * @description Configura las rutas de películas para el prefijo '/api/movies'.
 * @param {string} '/api/movies' - Prefijo de la ruta.
 * @param {Router} movies - Router de rutas de películas.
 */

app.use('/api/movies', movies); // Configuración de las rutas de películas

const PORT = process.env.PORT || 3000; // Configuración del puerto

/**
 * @function app.listen
 * @description Inicia el servidor Express y hace que escuche en el puerto 3000 especificado.
 * 
 * @param {number} PORT - El puerto en el que el servidor escuchará las solicitudes '3000'.
 * @param {Function} - Una función de callback que se ejecuta cuando el servidor está en funcionamiento.
 * 
 * @returns {void}
 */

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
