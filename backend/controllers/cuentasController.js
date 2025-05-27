// controllers/cuentasController.js
const db = require('../models/db');

// Obtener las cuentas de un usuario específico
const getCuentas = (req, res) => {
    const { usuario } = req.params; // Obtener el ID del usuario desde los parámetros
    const query = 'SELECT * FROM cuentas WHERE usuario_id = ?'; // Filtrar las cuentas por usuario_id
    db.query(query, [usuario], (err, results) => {
        if (err) {
            console.error('Error al obtener cuentas:', err);
            return res.status(500).send('Error al obtener cuentas');
        }
        res.json(results);
    });
};

// Crear una nueva cuenta para un usuario específico
const crearCuenta = (req, res) => {
    const { nombre, tipo, saldo, moneda, usuario_id } = req.body; // Recibir los datos de la cuenta y el usuario
    const query = 'INSERT INTO cuentas (usuario_id, nombre, tipo, saldo, moneda) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [usuario_id, nombre, tipo, saldo, moneda], (err, results) => {
        if (err) {
            console.error('Error al crear cuenta:', err);
            return res.status(500).send('Error al crear cuenta');
        }
        res.status(201).send('Cuenta creada');
    });
};

// Eliminar una cuenta por ID
const eliminarCuenta = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cuentas WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar cuenta:', err);
            return res.status(500).send('Error al eliminar cuenta');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Cuenta no encontrada');
        }
        res.send('Cuenta eliminada');
    });
};

module.exports = {
    getCuentas,
    crearCuenta,
    eliminarCuenta,
};
