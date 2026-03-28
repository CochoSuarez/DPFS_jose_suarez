const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController');

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

// Listado y Creación
router.get('/', productController.index);
router.get('/create', productController.create);
router.post('/', upload.single('image'), productController.store);

// Carrito
router.get('/cart', (req, res) => res.render('products/productCart'));

// Detalle, Edición y Borrado
router.get('/:id', productController.detail);

router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), productController.update);

router.delete('/:id', productController.destroy);

module.exports = router;