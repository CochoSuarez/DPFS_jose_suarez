const bcryptjs = require('bcryptjs');
const db = require('../../models'); // Subimos dos niveles hasta la raíz

const controller = {
    // Muestra la vista de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Muestra la vista de Registro
    register: (req, res) => {
        res.render('users/register');
    },

    // Procesa el Registro (Sequelize)
    processRegister: async (req, res) => {
        try {
            await db.User.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : 'default-avatar.png'
            });
            res.redirect('/users/login');
        } catch (error) {
            console.log(error);
            res.send('Error al registrar el usuario');
        }
    },

    // Procesa el Login (Sequelize)
    processLogin: async (req, res) => {
        try {
            const userToLogin = await db.User.findOne({
                where: { email: req.body.email }
            });

            if (userToLogin) {
                let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
                
                if (isPasswordOk) {
                    let userPlain = userToLogin.get({ plain: true });
                    delete userPlain.password;

                    req.session.userLogged = userPlain;

                    if (req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 15 });
                    }

                    return res.redirect('/users/profile');
                }
                
                return res.render('users/login', {
                    errors: { email: { msg: 'Las credenciales son inválidas' } }
                });
            }

            return res.render('users/login', {
                errors: { email: { msg: 'No se encuentra este email en nuestra base de datos' } }
            });

        } catch (error) {
            console.log(error);
            res.send('Hubo un error al intentar loguearse');
        }
    },

    // Muestra el perfil del usuario
    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },

    // --- MÉTODOS DE EDICIÓN (PARA EL SPRINT 6) ---

    // Muestra el formulario de edición
    edit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            res.render('users/userEdit', { user });
        } catch (error) {
            console.log(error);
            res.send('Error al cargar la edición de perfil');
        }
    },

    // Procesa la edición
    update: async (req, res) => {
        try {
            // 1. Actualizamos en la DB
            await db.User.update({
                nombre: req.body.nombre,
                email: req.body.email,
                avatar: req.file ? req.file.filename : undefined
            }, {
                where: { id: req.params.id }
            });

            // 2. Buscamos el usuario actualizado para refrescar la sesión
            const userUpdated = await db.User.findByPk(req.params.id);
            let userPlain = userUpdated.get({ plain: true });
            delete userPlain.password;
            
            // 3. Sobreescribimos la sesión para que el header refleje los cambios
            req.session.userLogged = userPlain;

            res.redirect('/users/profile');
        } catch (error) {
            console.log(error);
            res.send('Error al actualizar el perfil');
        }
    },

    // Cierra la sesión
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controller;