# CineCampus

## Descripción

CineCampus es una aplicación web diseñada para gestionar la selección de películas, compra de boletos, asignación de asientos y descuentos VIP para una empresa de entretenimiento.

## Tecnologías Utilizadas

- Node.js con Express
- MongoDB
- EJS para la renderización del lado del servidor 'proximamente'.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Instala las dependencias adicionales con `npm install express mongoose dotenv passport socket.io`.
4. Inicia el servidor con `npm start`.

## Estructura del Proyecto

- `config/`: Configuración de la base de datos.
- `controllers/`: Lógica de control para las rutas.
- `models/`: Esquemas de datos (MongoDB).
- `routes/`: Definición de las rutas de la API.
- `views/`: Plantillas EJS.
- `public/`: Archivos estáticos (CSS, JS, imágenes).
- `middlewares/`: Middlewares personalizados.
- `services/`: Servicios adicionales.

## Uso

1. Asegúrate de que MongoDB esté ejecutándose en tu máquina.
