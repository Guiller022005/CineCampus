require('dotenv').config(); // carga las variables de entorno desde un archivo .env.
const express = require('express'); // Framework para manejar el servidor
const connectDB = require('./server/config/db'); // Importa la función de conexión a la base de datos MongoDB
const app = express(); // Instancia
const movies = require('./server/routes/movies'); // Importa rutas de peliculas


/**
 * @function connectDB
 * @description Establece la conexión con la base de datos MongoDB utilizando la configuración en la variable de entorno.
 * Se llama al inicio de la aplicación para asegurar que la base de datos esté disponible antes de recibir solicitudes.
 */
connectDB();

// Middlewares
app.use(express.json());


/**
 * @function app.get
 * @description Ruta raíz para verificar que la API esté funcionando.
 * 
 * @param {string} '/' - La ruta raíz de la API.
 * @param {Function} req - Objeto de solicitud (request) Express.
 * @param {Function} res - Objeto de respuesta (response) Express.
 * 
 * @returns {void}
 */
app.get('/', (req, res) => res.send('API funcionando'));

// Configuracion del puerto y listen
const PORT = process.env.PORT || 3000;

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
