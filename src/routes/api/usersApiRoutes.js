const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

// Ruta para el listado total (Suele ser /api/users)
router.get('/', usersApiController.list);

// Ruta para el detalle de un usuario (Suele ser /api/users/:id)
router.get('/:id', usersApiController.detail);

module.exports = router;