const db = require('../models/db');

// Obtener todas las transferencias de un usuario por su ID
const obtenerTransferencias  = (req, res) => {
    const usuarioId = req.params.usuarioId;

    // Obtener la cuenta del usuario
    const queryCuenta = 'SELECT id FROM cuentas WHERE usuario_id = ?';
    db.query(queryCuenta, [usuarioId], (err, cuentas) => {
        if (err) {
            console.error('Error al obtener la cuenta del usuario:', err);
            return res.status(500).send('Error al obtener la cuenta');
        }

        if (cuentas.length === 0) {
            return res.status(404).send('Cuenta no encontrada para el usuario');
        }

        const cuenta_id = cuentas[0].id;

        // Obtener transferencias asociadas a la cuenta (como origen o destino)
        const queryTransferencias = `
            SELECT t.*, 
                   c1.nombre AS origen_nombre, 
                   c2.nombre AS destino_nombre
            FROM transferencias t
            LEFT JOIN cuentas c1 ON t.cuenta_origen_id = c1.id
            LEFT JOIN cuentas c2 ON t.cuenta_destino_id = c2.id
            WHERE t.cuenta_origen_id = ? OR t.cuenta_destino_id = ?
        `;

        db.query(queryTransferencias, [cuenta_id, cuenta_id], (err, results) => {
            if (err) {
                console.error('Error al obtener transferencias:', err);
                return res.status(500).send('Error al obtener transferencias');
            }

            res.json(results);
        });
    });
};


// Crear nueva transferencia
const crearTransferencia = (req, res) => {
    const { cuenta_origen_id, cuenta_destino_id, descripcion, monto, fecha } = req.body;

    // Comenzar una transacción para asegurar que ambas actualizaciones sean atómicas
    db.beginTransaction((err) => {
        if (err) {
            console.error('Error iniciando transacción:', err);
            return res.status(500).json({ message: 'Error del servidor' });
        }

        // Insertar la transferencia
        const query = `
            INSERT INTO transferencias (cuenta_origen_id, cuenta_destino_id, descripcion, monto, fecha)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        db.query(query, [cuenta_origen_id, cuenta_destino_id, descripcion, monto, fecha], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Error creando transferencia:', err);
                    return res.status(500).json({ message: 'Error del servidor' });
                });
            }

            // Restar el monto de la cuenta de origen
            const updateOrigenQuery = `
                UPDATE cuentas
                SET saldo = saldo - ?
                WHERE id = ?
            `;
            db.query(updateOrigenQuery, [monto, cuenta_origen_id], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Error actualizando cuenta origen:', err);
                        return res.status(500).json({ message: 'Error del servidor' });
                    });
                }

                // Sumar el monto a la cuenta de destino
                const updateDestinoQuery = `
                    UPDATE cuentas
                    SET saldo = saldo + ?
                    WHERE id = ?
                `;
                db.query(updateDestinoQuery, [monto, cuenta_destino_id], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error actualizando cuenta destino:', err);
                            return res.status(500).json({ message: 'Error del servidor' });
                        });
                    }

                    // Si todo es correcto, confirmar la transacción
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Error al confirmar transacción:', err);
                                return res.status(500).json({ message: 'Error del servidor' });
                            });
                        }

                        // Devolver la respuesta exitosa
                        res.status(201).json({ message: 'Transferencia creada correctamente' });
                    });
                });
            });
        });
    });
};

module.exports = {
    obtenerTransferencias,
    crearTransferencia
  };

