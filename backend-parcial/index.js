const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/Routers/authRoutes');
const perfilRoutes = require('./src/Routers/perfilRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
// cors() permite que Angular (que correrá en otro puerto) pueda hacerle peticiones a Node
app.use(cors()); 
// express.json() permite que nuestro servidor entienda los datos que enviemos en formato JSON
app.use(express.json()); 
// El endpoint final será: http://localhost:3000/api/auth/login
app.use('/api/auth', authRoutes);
app.use('/api/perfil', perfilRoutes);

// --- Rutas de prueba ---
app.get('/', (req, res) => {
    res.json({ mensaje: 'API del Parcial Web funcionando correctamente 🚀' });
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});