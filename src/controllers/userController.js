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
            // Encriptamos la contraseña
            password: bcryptjs.hashSync(req.body.password, 10),
            // Guardamos el nombre del archivo que subió Multer
            avatar: req.file ? req.file.filename : 'default-avatar.png'
        };

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        
        res.redirect('/users/login');
    },

    // Procesa el Login (NUEVO)
    processLogin: (req, res) => {
        // 1. Leemos todos los usuarios
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        
        // 2. Buscamos al usuario por el email que viene del formulario
        const userToLogin = users.find(user => user.email == req.body.email);

        if (userToLogin) {
            // 3. Si el usuario existe, comparamos las contraseñas
            // compareSync devuelve true si coinciden, false si no.
            let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            
            if (isPasswordOk) {
                // Si la clave es correcta, por ahora lo mandamos al Home
                // (En el Sprint 5 aprenderemos a usar Session para que 'recuerde' al usuario)
                return res.redirect('/');
            } else {
                // Si la clave es incorrecta
                return res.send("La contraseña es incorrecta.");
            }
        } else {
            // Si el email no existe en nuestro JSON
            return res.send("No encontramos ningún usuario con ese email.");
        }
    }
};

module.exports = controller;