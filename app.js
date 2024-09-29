const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./server/config/db');
const movies = require('./server/routes/movies');
const asientos = require('./server/routes/asientos');
const movimientos = require('./server/routes/movimiento');
const usuarios = require('./server/routes/users');
const boletas = require('./server/routes/tickets');
const log_InRouter = require('./server/routes/log-InRouter');
require('./server/middlewares/authCookies');

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

app.use("/login", log_InRouter);
app.use('/api/movies', movies);
app.use('/api/asientos', asientos);
app.use('/api/movimientos', movimientos);
app.use('/api/users/', usuarios);
app.use('/api/boletas', boletas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
