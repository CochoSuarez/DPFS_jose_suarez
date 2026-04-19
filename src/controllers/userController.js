const bcryptjs = require('bcryptjs');
const db = require('../../models'); // Subimos dos niveles hasta la raíz
const { validationResult } = require('express-validator'); // Requerimos esto para capturar errores

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
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

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
            // 1. Validaciones básicas de campos vacíos o formato
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('users/login', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            // 2. Buscamos al usuario por email
            const userToLogin = await db.User.findOne({
                where: { email: req.body.email }
            });

            if (userToLogin) {
                // 3. Comparamos la contraseña
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
                
                // Si la contraseña no coincide
                return res.render('users/login', {
                    errors: { email: { msg: 'Las credenciales son inválidas' } },
                    oldData: req.body
                });
            }

            // Si el email no existe
            return res.render('users/login', {
                errors: { email: { msg: 'No se encuentra este email en nuestra base de datos' } },
                oldData: req.body
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

    // --- MÉTODOS DE EDICIÓN ---

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
            await db.User.update({
                nombre: req.body.nombre,
                email: req.body.email,
                avatar: req.file ? req.file.filename : undefined
            }, {
                where: { id: req.params.id }
            });

            const userUpdated = await db.User.findByPk(req.params.id);
            let userPlain = userUpdated.get({ plain: true });
            delete userPlain.password;
            
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