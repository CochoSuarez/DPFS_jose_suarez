const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const controller = {
    // Muestra la vista de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Muestra la vista de Registro
    register: (req, res) => {
        res.render('users/register');
    },

    // Procesa el Registro
    processRegister: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : 'default-avatar.png'
        };

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        
        res.redirect('/users/login');
    },

    // Procesa el Login
    processLogin: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const userToLogin = users.find(user => user.email == req.body.email);

        if (userToLogin) {
            let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            
            if (isPasswordOk) {
                // Borramos la contraseña para que no quede viajando en la sesión por seguridad
                delete userToLogin.password;

                // Guardamos al usuario en Session
                req.session.userLogged = userToLogin;

                // Si tildó "Recordame", creamos la cookie (dura 15 minutos en este ejemplo)
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
    },

    // Muestra el perfil del usuario (NUEVO)
    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },

    // Cierra la sesión (NUEVO)
    logout: (req, res) => {
        res.clearCookie('userEmail'); // Borramos la cookie
        req.session.destroy(); // Destruimos la sesión
        return res.redirect('/');
    }
};

module.exports = controller;