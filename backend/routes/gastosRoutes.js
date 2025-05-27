const express = require('express');
const router = express.Router();
const gastosController = require('../controllers/gastosController');
const auth = require('../middleware/authMiddleware');

// /api/gastos/...
router.get('/:usuarioId', auth, gastosController.getGastos);
router.post('/', auth, gastosController.crearGasto);

module.exports = router;
