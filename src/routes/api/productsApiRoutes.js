const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController');

// Ruta para el listado total de productos (localhost:3001/api/products)
router.get('/', productsApiController.list);

// Ruta para el detalle de un producto específico (localhost:3001/api/products/:id)
router.get('/:id', productsApiController.detail);

module.exports = router;