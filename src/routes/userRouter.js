const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');

// Requerimos los middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidations = require('../middlewares/userRegisterValidation'); 
const loginValidations = require('../middlewares/userLoginValidation'); // <-- NUEVO

// --- CONFIGURACIÓN DE MULTER ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_user${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });

// --- RUTAS ---

// Login (Solo invitados)
router.get('/login', guestMiddleware, userController.login);
// Proceso de Login con validaciones (POST) <-- ACTUALIZADO
router.post('/login', loginValidations, userController.processLogin);

// Registro (Solo invitados)
router.get('/registro', guestMiddleware, userController.register);

// Proceso de Registro con validaciones (POST)
router.post('/registro', upload.single('avatar'), registerValidations, userController.processRegister);

// Perfil (Solo usuarios logueados)
router.get('/profile', authMiddleware, userController.profile);

// --- EDICIÓN DE PERFIL ---
router.get('/edit/:id', authMiddleware, userController.edit);
router.put('/edit/:id', authMiddleware, upload.single('avatar'), userController.update);

// Logout
router.get('/logout', userController.logout);

module.exports = router;