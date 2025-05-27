// controllers/categoriasController.js
const db = require('../models/db');

// Obtener todas las categorías
const obtenerCategorias = (req, res) => {
  const sql = 'SELECT * FROM categorias';

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(resultados);
  });
};

// Crear una nueva categoría
const crearCategoria = (req, res) => {
  const { nombre, tipo } = req.body;

  if (!nombre || !tipo) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const sql = 'INSERT INTO categorias (nombre, tipo) VALUES (?, ?)';
  db.query(sql, [nombre, tipo], (err, resultado) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'La categoría ya existe' });
      }
      console.error('Error al crear categoría:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.status(201).json({ message: 'Categoría creada', id: resultado.insertId });
  });
};

module.exports = {
  obtenerCategorias,
  crearCategoria
};
