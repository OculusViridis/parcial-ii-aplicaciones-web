const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables del .env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Mensaje opcional para confirmar que la conexión es exitosa al levantar el backend
pool.on('connect', () => {
    console.log('✅ Conectado a la base de datos PostgreSQL (bd_usuarios)');
});

// Exportamos un método genérico para hacer consultas parametrizadas en todo el proyecto
module.exports = {
    query: (text, params) => pool.query(text, params),
};