const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password)
    return res.status(400).json({ message: 'Faltan datos' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existing] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: 'El correo ya está registrado' });

    await db.promise().query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Faltan datos' });

  try {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login exitoso', token, user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
