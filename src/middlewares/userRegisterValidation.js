const { body } = require('express-validator');
const path = require('path');
const db = require('../../models'); // Subimos dos niveles: salimos de middlewares y salimos de src

const validations = [
    body('nombre')
        .notEmpty().withMessage('Tenés que escribir un nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('email')
        .notEmpty().withMessage('Tenés que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido').bail()
        .custom(async (value, { req }) => {
            let userInDb = await db.User.findOne({ where: { email: value } });
            if (userInDb) {
                throw new Error('Este email ya está registrado');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Tenés que escribir una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (!file) {
            // No es obligatorio subir foto, Multer ya pone la default si no hay
            return true; 
        } else {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validations;
