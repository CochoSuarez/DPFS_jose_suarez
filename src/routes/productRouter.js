const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController');

// --- REQUERIMOS EL MIDDLEWARE DE VALIDACIÓN ---
const productValidations = require('../middlewares/productValidation');

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

// 1. Listado
router.get('/', productController.index);

// 2. Búsqueda
router.get('/search', productController.search);

// 3. Creación
router.get('/create', productController.create);
router.post('/', upload.single('image'), productValidations, productController.store);

// 4. Carrito (Actualizada para usar el controlador)
router.get('/cart', productController.cart);

// 5. Detalle (Siempre debajo de las rutas estáticas como /cart o /create)
router.get('/:id', productController.detail);

// 6. Edición
router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), productValidations, productController.update);

// 7. Borrado
router.delete('/:id', productController.destroy);

module.exports = router;