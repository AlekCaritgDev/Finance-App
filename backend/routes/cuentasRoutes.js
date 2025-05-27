const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentasController');

// Obtener las cuentas de un usuario específico
router.get('/:usuario', cuentasController.getCuentas);

// Crear una nueva cuenta para un usuario específico
router.post('/', cuentasController.crearCuenta);

// Eliminar una cuenta por ID
router.delete('/:id', cuentasController.eliminarCuenta);

module.exports = router;
