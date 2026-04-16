const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');

// Requerimos los middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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
router.post('/login', userController.processLogin);

// Registro (Solo invitados)
router.get('/registro', guestMiddleware, userController.register);
router.post('/registro', upload.single('avatar'), userController.processRegister);

// Perfil (Solo usuarios logueados)
router.get('/profile', authMiddleware, userController.profile);

// Logout
router.get('/logout', userController.logout);

module.exports = router;