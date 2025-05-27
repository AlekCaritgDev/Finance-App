const express = require('express');
const categoriasController = require('../controllers/categoriasController');
const router = express.Router();

// Definir las rutas
router.get('/', categoriasController.obtenerCategorias);
router.post('/', categoriasController.crearCategoria);

module.exports = router;
