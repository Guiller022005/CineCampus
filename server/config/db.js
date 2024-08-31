    /**
     * @file db.js
     * @description Archivo que maneja la conexión a la base de datos MongoDB utilizando Mongoose.
     * Configura la URI de conexión a partir de las variables de entorno y exporta la función para establecer la conexión.
     */
    const mongoose = require('mongoose'); // Importa la biblioteca Mongoose para manejar la base de datos MongoDB
    require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

let mongoURI; // Declara la variable mongoURI para la URI de conexión

if (process.env.MONGO_USER === "root") {
    mongoURI = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
} else {
    mongoURI = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/ligaBetPlay`;
    console.log(process.env.MONGO_USER);
}

/**
 * @function connectDB
 * @description Establece la conexión con la base de datos MongoDB utilizando Mongoose.
 * En caso de éxito, imprime un mensaje en la consola. En caso de error, imprime el mensaje de error y termina el proceso.
 * 
 * @async
 * @returns {Promise<void>} Devuelve una promesa que se resuelve cuando la conexión con MongoDB es exitosa o se rechaza en caso de error.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            dbName: process.env.MONGO_DB_NAME // Nombre de la base de datos especificado en las variables de entorno
        });
        console.log('MongoDB conectado exitosamente'); // Mensaje en consola al conectar exitosamente
    } catch (err) {
        console.error('Error al conectar con MongoDB:', err.message); // Mensaje de error en consola si falla la conexión
        process.exit(1); // Termina el proceso con un código de salida 1 en caso de error
    }
};

module.exports = connectDB;
