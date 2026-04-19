const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (!file) {
            // Si es edición, puede no venir imagen nueva, pero para creación el sprint suele pedirla.
            // Por ahora lo dejamos pasar, pero validamos la extensión si el archivo existe.
            return true; 
        } else {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validations;