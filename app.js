// app.js
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const express = require('express'); // Framework para manejar el servidor
const session = require('express-session'); // Middleware para manejar sesiones
const passport = require('passport'); // Middleware para manejar autenticación
const connectDB = require('./server/database/databaseMongo'); // Importa la función de conexión a la base de datos MongoDB
const movies = require('./server/routes/movies'); // Importa rutas de películas
const asientos = require('./server/routes/asientos'); // Importa rutas de asientos
const movimientos = require('./server/routes/movimiento'); // Importa rutas de movimientos
const usuarios = require('./server/routes/users'); // Importa rutas de usuarios
const boletas = require('./server/routes/tickets'); // Importa rutas de boletas
const log_InRouter = require('./server/routers/log-InRouter');
require('./server/middlewares/auth');

const app = express(); // Instancia


app.use("/login", log_InRouter);


// Configuración de sesión
app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true
}));

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

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

app.use('/api/asientos', asientos); // Configuración de las rutas de asientos

app.use('/api/movimientos', movimientos); // Configuración de las rutas de los movimientos

app.use('/api/users/', usuarios); // Configuración de las rutas de los usuarios

app.use('/api/boletas', boletas); // Configuracion de rutas de boletas

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