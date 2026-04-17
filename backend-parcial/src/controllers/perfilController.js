const db = require('../config/db');

// --- 1. OBTENER PERFIL (GET) ---
const obtenerPerfil = async (req, res) => {
    try {
        const { usuario_id } = req.query; // Lo enviaremos como /api/perfil?usuario_id=1

        if (!usuario_id) {
            return res.status(400).json({ success: false, mensaje: 'El ID de usuario es requerido' });
        }

        const query = 'SELECT * FROM perfil WHERE usuario_id = $1';
        const { rows } = await db.query(query, [usuario_id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, mensaje: 'Perfil no encontrado' });
        }

        res.status(200).json({ success: true, perfil: rows[0] });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
    }
};

// --- 2. CREAR PERFIL (POST) ---
const crearPerfil = async (req, res) => {
    try {
        const { usuario_id, nombre, apellido, edad, correo, telefono } = req.body;

        // Validaciones básicas de backend solicitadas en el examen
        if (!usuario_id || !nombre || !apellido || !edad || !correo || !telefono) {
            return res.status(400).json({ success: false, mensaje: 'Todos los campos son obligatorios' });
        }
        
        // Validación de teléfono (8 dígitos) y edad numérica
        if (!/^\d{8}$/.test(telefono) || isNaN(edad)) {
            return res.status(400).json({ success: false, mensaje: 'Formato de teléfono o edad inválido' });
        }

        const query = `
            INSERT INTO perfil (usuario_id, nombre, apellido, edad, correo, telefono) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [usuario_id, nombre, apellido, edad, correo, telefono]);

        res.status(201).json({ success: true, mensaje: 'Perfil creado exitosamente', perfil: rows[0] });
    } catch (error) {
        console.error('Error al crear perfil:', error);
        // Manejo de error si el perfil ya existe (violación de restricción UNIQUE en usuario_id)
        if (error.code === '23505') {
            return res.status(400).json({ success: false, mensaje: 'Este usuario ya tiene un perfil o el correo ya está en uso' });
        }
        res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
    }
};

// --- 3. ACTUALIZAR PERFIL (PUT) ---
const actualizarPerfil = async (req, res) => {
    try {
        const { usuario_id, nombre, apellido, edad, correo, telefono } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ success: false, mensaje: 'El ID de usuario es requerido para actualizar' });
        }

        const query = `
            UPDATE perfil 
            SET nombre = $1, apellido = $2, edad = $3, correo = $4, telefono = $5 
            WHERE usuario_id = $6 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nombre, apellido, edad, correo, telefono, usuario_id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, mensaje: 'Perfil no encontrado para actualizar' });
        }

        res.status(200).json({ success: true, mensaje: 'Perfil actualizado exitosamente', perfil: rows[0] });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    obtenerPerfil,
    crearPerfil,
    actualizarPerfil
};