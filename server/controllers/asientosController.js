const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Asiento = require('../model/asiento');
const Funcion = require('../model/funcion');

// Controlador para obtener todos los asientos
exports.getAllAsientos = async (req, res) => {
  try {
    const asientos = await Asiento.find();
    console.log('Asientos obtenidos:', asientos);
    res.status(200).json(asientos);
  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.obtenerAsientosDisponiblesPorFunciones = async (req, res) => {
    try {
        const { id_funcion } = req.params; // Obtener el id_funcion del parámetro de la URL

        // Buscar la función por id_funcion
        const funcion = await Funcion.findById(id_funcion);
        if (!funcion) {
            return res.status(404).json({ message: 'Función no encontrada' });
        }

        // Obtener la fecha y hora de la función
        const { fecha, hora } = funcion;

        // Realizar la agregación para obtener los asientos disponibles
        const asientosDisponibles = await Funcion.aggregate([
            { $match: { fecha: fecha, hora: hora } }, // Filtrar por fecha y hora
            { $unwind: "$asientos" }, // Descomponer el array de asientos
            { $match: { "asientos.estado": "disponible" } }, // Filtrar por asientos disponibles
            {
                $lookup: {
                    from: "asiento", // Nombre de la colección de asientos
                    localField: "asientos.asiento", // Campo local que conecta con la colección de asientos
                    foreignField: "_id", // Campo en la colección de asientos que se usa para la coincidencia
                    as: "asientoInfo" // Nombre del array de resultados
                }
            },
            { $unwind: "$asientoInfo" }, // Descomponer el array de resultados del lookup
            { $project: { "_id": 0 ,"codigo": "$asientoInfo.codigo", "_id": "$asientoInfo._id" } } // Proyectar solo el campo de código de asiento
        ]);

        // Enviar la respuesta
        res.status(200).json({
            message: 'Asientos disponibles obtenidos',
            asientos: asientosDisponibles
        });
    } catch (error) {
        console.error('Error al obtener los asientos disponibles:', error);
        res.status(500).json({ message: 'Error al obtener los asientos disponibles' });
    }
};

