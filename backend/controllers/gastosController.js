const db = require('../models/db');

// Obtener los gastos de un usuario específico
const getGastos = (req, res) => {
    const usuarioId = req.params.usuarioId;  // Tomar el usuarioId desde los parámetros de la URL

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

        // Obtener los movimientos (gastos) asociados a la cuenta del usuario
        const queryGastos = 'SELECT * FROM movimientos WHERE cuenta_id = ?';
        db.query(queryGastos, [cuenta_id], (err, results) => {
            if (err) {
                console.error('Error al obtener gastos:', err);
                return res.status(500).send('Error al obtener gastos');
            }
            res.json(results);  // Devolver los resultados de los gastos
        });
    });
};




// Crear un nuevo gasto
const crearGasto = (req, res) => {
    const usuarioId = req.usuario.id;
    const { categoria_id, tipo, descripcion, monto, fecha } = req.body;

    if (!categoria_id || !monto || !fecha || tipo !== 'Gasto') {
        return res.status(400).send('Faltan datos requeridos o tipo incorrecto');
    }

    // Obtener la cuenta del usuario
    const queryCuenta = 'SELECT id, saldo FROM cuentas WHERE usuario_id = ?';
    db.query(queryCuenta, [usuarioId], (err, cuentas) => {
        if (err) {
            console.error('Error al obtener la cuenta del usuario:', err);
            return res.status(500).send('Error al obtener la cuenta');
        }

        if (cuentas.length === 0) {
            return res.status(404).send('Cuenta no encontrada para el usuario');
        }

        const cuenta = cuentas[0];
        const cuenta_id = cuenta.id;
        const saldo = cuenta.saldo;

        if (monto > saldo) {
            return res.status(200).json({ message: 'No tienes suficiente saldo para realizar este gasto' });
        }        

        const queryInsert = `
            INSERT INTO movimientos (cuenta_id, categoria_id, tipo, descripcion, monto, fecha)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(queryInsert, [cuenta_id, categoria_id, tipo, descripcion, monto, fecha], (err, result) => {
            if (err) {
                console.error('Error al crear gasto:', err);
                return res.status(500).send('Error al crear gasto');
            }

            const nuevoSaldo = saldo - monto;
            const queryActualizarSaldo = 'UPDATE cuentas SET saldo = ? WHERE id = ?';

            db.query(queryActualizarSaldo, [nuevoSaldo, cuenta_id], (err) => {
                if (err) {
                    console.error('Error al actualizar el saldo:', err);
                    return res.status(500).send('Error al actualizar el saldo');
                }

                res.status(201).json({
                    message: 'Gasto creado correctamente',
                    gasto: {
                        cuenta_id,
                        categoria_id,
                        tipo,
                        descripcion,
                        monto,
                        fecha
                    }
                });
            });
        });
    });
};



// Eliminar un gasto por ID
const eliminarGasto = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM gastos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar gasto:', err);
            return res.status(500).send('Error al eliminar gasto');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Gasto no encontrado');
        }
        res.send('Gasto eliminado');
    });
};

module.exports = {
    getGastos,
    crearGasto,
    eliminarGasto,
};
