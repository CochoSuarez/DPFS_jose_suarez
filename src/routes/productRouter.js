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

// Listado
router.get('/', productController.index);

// BÚSQUEDA
router.get('/search', productController.search);

// CREACIÓN
router.get('/create', productController.create);
// Agregamos las validaciones al POST
router.post('/', upload.single('image'), productValidations, productController.store);

// Carrito
router.get('/cart', (req, res) => res.render('products/productCart'));

// DETALLE
router.get('/:id', productController.detail);

// EDICIÓN
router.get('/:id/edit', productController.edit);
// Agregamos las validaciones al PUT
router.put('/:id', upload.single('image'), productValidations, productController.update);

// BORRADO
router.delete('/:id', productController.destroy);

module.exports = router;