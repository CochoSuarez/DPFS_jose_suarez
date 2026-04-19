const db = require('../../../models');

const usersApiController = {
    // Listado de usuarios
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['id', 'nombre', 'email'] // Usamos 'nombre' como está en tu User.js
            });

            const usersWithUrl = users.map(user => {
                return {
                    id: user.id,
                    name: user.nombre, // Aquí lo mapeamos a "name" para que la API sea estándar
                    email: user.email,
                    detail: `/api/users/${user.id}`
                }
            });

            return res.json({
                count: users.length,
                users: usersWithUrl
            });
        } catch (error) {
            console.log(error); // Esto nos ayuda a ver errores en la terminal si algo falla
            return res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }
    },

    // Detalle de un usuario
    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: ['id', 'nombre', 'email', 'avatar'] // Usamos 'avatar' como está en tu User.js
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            return res.json({
                id: user.id,
                name: user.nombre,
                email: user.email,
                imageUrl: `/images/users/${user.avatar}`
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }
    }
};

module.exports = usersApiController;