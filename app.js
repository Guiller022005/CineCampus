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
app.use(express.static(path.join(__dirname, 'src')));

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
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Rutas para las páginas de la aplicación
app.get('/cineCampus/CreateAccount', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'sign-Up.html'));
});
app.get('/cineCampus/Log-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'log-in.html'));
});
app.get('/cineCampus/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'home.html'));
});
app.get('/cineCampus/cinema', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'cinema.html'));
});
app.get('/cineCampus/seats', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'chooseSeat.html'));
});
app.get('/cineCampus/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'order.html'));
});
app.get('/cineCampus/ticket', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'ticket.html'));
});

// Rutas para la API
app.use("/login", log_InRouter);
app.use('/api/movies', movies);
app.use('/api/asientos', asientos);
app.use('/api/movimientos', movimientos);
app.use('/api/users/', usuarios);
app.use('/api/boletas', boletas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));