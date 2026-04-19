const { body } = require('express-validator');

const validations = [
    body('email')
        .notEmpty().withMessage('Tenés que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    
    body('password')
        .notEmpty().withMessage('Tenés que escribir una contraseña')
];

module.exports = validations;