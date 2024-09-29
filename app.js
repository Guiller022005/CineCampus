require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const express = require('express'); // Framework para manejar el servidor
const session = require('express-session'); // Middleware para manejar sesiones
const passport = require('passport'); // Middleware para manejar autenticación
const connectDB = require('./server/config/db'); // Importa la función de conexión a la base de datos MongoDB
const connectDB = require('./server/config/db'); // Importa la función de conexión a la base de datos MongoDB
const movies = require('./server/routes/movies'); // Importa rutas de películas
const asientos = require('./server/routes/asientos'); // Importa rutas de asientos
const movimientos = require('./server/routes/movimiento'); // Importa rutas de movimientos
const usuarios = require('./server/routes/users'); // Importa rutas de usuarios
require('./server/middlewares/auth');

const app = express();

// Servir la carpeta src como estática
app.use(express.static(path.join('/home/camper/CineCampus/src')));

// Configuración de sesión
app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true
}));

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use(express.json());

// Ruta para la página principal
app.get('/cineCampus', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src', 'index.html'));
});

// Ruta para la página de crear cuenta
app.get('/cineCampus/CreateAccount', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'sign-Up.html')); // Actualiza con la ruta correcta
});

// Ruta para la página de crear cuenta
app.get('/cineCampus/Log-in', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'log-in.html')); // Actualiza con la ruta correcta
});

// Ruta para la página de inicio
app.get('/cineCampus/home', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'home.html')); // Ruta para la página de inicio
});

// Ruta para la página de cinema
app.get('/cineCampus/cinema', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'cinema.html')); // Ruta para la página de cinema
});

// Ruta para la página de ChooseSeat
app.get('/cineCampus/seats', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'chooseSeat.html')); // Ruta para la página de chooseSeat
});

// Ruta para la página de order
app.get('/cineCampus/order', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'order.html')); // Ruta para la página de order
});

// Ruta para la página de ticket
app.get('/cineCampus/ticket', (req, res) => {
    res.sendFile(path.join('/home/camper/CineCampus/src/views', 'ticket.html')); // Ruta para la página de ticket
});

app.use("/login", log_InRouter);
app.use('/api/movies', movies);
app.use('/api/asientos', asientos);
app.use('/api/movimientos', movimientos);
app.use('/api/users/', usuarios);
app.use('/api/boletas', boletas);

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

