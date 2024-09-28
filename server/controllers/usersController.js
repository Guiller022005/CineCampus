const { MongoClient } = require('mongodb'); // Importar MongoClient desde el paquete mongodb
const user = require('../models/user');

// Conexión al admin DB
const adminUri = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/admin`;
const adminClient = new MongoClient(adminUri); // Eliminar opciones obsoletas


/**
 * Controlador para obtener todos los usuarios de la base de datos.
 *
 * @async
 * @function obtenerUsuarios
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {void} - Devuelve una respuesta JSON con los usuarios obtenidos o un mensaje de error.
 */
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await user.find();
        console.log('Usuarios obtenidos: ', usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Controlador para obtener usuarios filtrados por rol.
 *
 * @async
 * @function obtenerUsuariosByRol
 * @param {Object} req - Objeto de solicitud (request) value define el rol a filtrar 'VIP' o 'estandar' descomenta el q necesitas usar .
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {void} - Devuelve una respuesta JSON con los usuarios filtrados por rol o un mensaje de error.
 */


exports.obtenerUsuariosByRol = async (req, res) => {
    try {
        // const value = 'VIP';
        const value = 'estandar';
        const usuarios = await user.find({ rol: value }); // Obtén todas las películas
        console.log('Usuarios obtenidas:', usuarios); // Imprime en consola para depuración
        res.status(200).json(usuarios); // Devuelve las películas en formato JSON
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // Imprime el error en consola
        res.status(500).json({ error: error.message }); // Devuelve un error si ocurre
    }
};

/**
 * Controlador para crear un nuevo usuario en MongoDB y en la colección `users`.
 *
 * @async
 * @function crearUsuario
 * @param {Object} req - Objeto de solicitud (request), debe incluir `user`, `pwd` y `rol`.
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {void} - Devuelve una respuesta JSON con el resultado de la operación o un mensaje de error.
 */
exports.crearUsuario = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { user: username, pwd: password, rol: role } = req.body;

    try {
        // Conectarse a la base de datos admin
        await adminClient.connect();
        const adminDb = adminClient.db('cineCampus');

        // Define roles y permisos basados en el rol proporcionado
        let userRoles;
        if (role === 'VIP') {
            userRoles = [
                { role: "VIP", db: "cineCampus" }
            ];
        } else if (role === 'estandar') {
            userRoles = [
                { role: "estandar", db: "cineCampus" }
            ];
        } else if (role === 'admin') {
            userRoles = [
                { role: "readWrite", db: "cineCampus" },
                { role: "dbAdmin", db: "cineCampus" },
                { role: "userAdmin", db: "cineCampus" }
            ];
        } else {
            return res.status(400).json({ error: 'Rol no válido' });
        }

        // Crear el usuario en MongoDB con permisos específicos
        await adminDb.command({
            createUser: username,
            pwd: password,
            roles: userRoles
        });

        // Luego, insertar el usuario en la colección `users`
        const nuevoUsuario = new user({ user: username, pwd: password, rol: role });
        await nuevoUsuario.save();

        console.log('Usuario creado:', username);
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await adminClient.close(); // Asegúrate de cerrar la conexión
    }
};

/**
 * Controlador para actualizar un usuario en la base de datos y en la base de datos admin.
 *
 * @async
 * @function actualizarUsuario
 * @param {Object} req - Objeto de solicitud (request), debe incluir `userId` (ID del usuario) y los campos a actualizar.
 * @param {Object} res - Objeto de respuesta (response).
 * @returns {void} - Devuelve una respuesta JSON con el resultado de la operación o un mensaje de error.
 */
exports.actualizarUsuario = async (req, res) => {
    const { userId } = req.params; // ID del usuario a actualizar
    const updateData = req.body; // Datos que se actualizarán (incluye potencialmente un nuevo nombre de usuario)
    
    try {
        // Buscar el usuario actual por ID en la colección de usuarios
        const usuarioActual = await user.findById(userId);

        if (!usuarioActual) {
            return res.status(404).json({ error: 'Usuario no encontrado en la colección' });
        }

        // Conectar a la base de datos admin
        await adminClient.connect();
        const adminDb = adminClient.db('cineCampus');

        // Si se está intentando cambiar el nombre de usuario
        if (updateData.user && updateData.user !== usuarioActual.user) {
            // Verificar si el usuario actual existe en la base de datos admin
            const existingUser = await adminDb.command({ usersInfo: { user: usuarioActual.user, db: 'cineCampus' } });

            if (existingUser.users.length > 0) {
                // Eliminar el usuario actual en la base de datos admin si existe
                await adminDb.command({
                    dropUser: usuarioActual.user
                });
                console.log('Usuario anterior eliminado:', usuarioActual.user);
            }

            // Crear un nuevo usuario en la base de datos admin con el nuevo nombre
            await adminDb.command({
                createUser: updateData.user,
                pwd: updateData.pwd || usuarioActual.pwd,
                roles: updateData.rol ? [{ role: updateData.rol, db: 'cineCampus' }] : []
            });

            console.log('Nuevo usuario creado en la base de datos admin:', updateData.user);
        } else {
            // Si no se cambia el nombre de usuario, solo actualiza los permisos y contraseña
            await adminDb.command({
                updateUser: usuarioActual.user,
                pwd: updateData.pwd || usuarioActual.pwd,
                roles: updateData.rol ? [{ role: updateData.rol, db: 'cineCampus' }] : []
            });

            console.log('Usuario actualizado en la base de datos admin:', usuarioActual.user);
        }

        // Finalmente, actualizar el documento en la colección de usuarios
        const usuarioActualizado = await user.findByIdAndUpdate(userId, updateData, { new: true });

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await adminClient.close(); // Asegúrate de cerrar la conexión
    }
};

