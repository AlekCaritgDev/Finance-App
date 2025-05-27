const express = require('express');
const router = express.Router();
const transferenciasController = require('../controllers/trasnfrenciasController');
const auth = require('../middleware/authMiddleware');

// GET transferencias de un usuario
router.get('/:usuarioId', auth, transferenciasController.obtenerTransferencias);

// POST para crear transferencia
router.post('/', auth, transferenciasController.crearTransferencia);

module.exports = router;
