const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const cuentasRoutes = require('./routes/cuentasRoutes');
const gastosRoutes = require('./routes/gastosRoutes');
const categoriasroutes = require('./routes/categoriasroutes');  // Verifica el nombre aquí
const transferenciasRouter = require('./routes/transferenciasRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cuentas', cuentasRoutes);
app.use('/api/gastos', gastosRoutes);  // Asegúrate de que esté correctamente escrita la ruta 'gastos'
app.use('/api/categorias', categoriasroutes);  // Verifica la ruta para categorías
app.use('/api/transferencias', transferenciasRouter);  // Verifica la ruta para transferencias

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
