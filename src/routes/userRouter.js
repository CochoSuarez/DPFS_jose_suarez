const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');

// --- CONFIGURACIÓN DE MULTER PARA USUARIOS ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Las fotos de perfil van a una carpeta distinta: /images/users
        cb(null, path.resolve(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_user${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });

// --- RUTAS ---
router.get('/login', userController.login);
router.get('/registro', userController.register);

// Ruta para procesar el registro (POST)
router.post('/registro', upload.single('avatar'), userController.processRegister);


// Ruta para procesar el login (POST)
router.post('/login', userController.processLogin);

module.exports = router;