const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController');

// --- REQUERIMOS LOS MIDDLEWARES ---
const productValidations = require('../middlewares/productValidation');
const adminMiddleware = require('../middlewares/adminMiddleware'); // <-- EL NUEVO GUARDAESPALDAS

// --- CONFIGURACIÓN DE MULTER ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage });

// --- RUTAS ---

// 1. Listado (Público)
router.get('/', productController.index);

// 2. Búsqueda (Público)
router.get('/search', productController.search);

// 3. Creación (SOLO ADMIN)
router.get('/create', adminMiddleware, productController.create);
router.post('/', upload.single('image'), adminMiddleware, productValidations, productController.store);

// 4. Carrito (Público/Usuario)
router.get('/cart', productController.cart);

// 5. Detalle (Público)
router.get('/:id', productController.detail);

// 6. Edición (SOLO ADMIN)
router.get('/:id/edit', adminMiddleware, productController.edit);
router.put('/:id', upload.single('image'), adminMiddleware, productValidations, productController.update);

// 7. Borrado (SOLO ADMIN)
router.delete('/:id', adminMiddleware, productController.destroy);

module.exports = router;