const db = require('../config/db');

const login = async (req, res) => {
    try {
        // Obtenemos el correo y la contraseña del cuerpo de la petición
        const { correo, contrasena } = req.body;

        // Validaciones básicas de backend (nunca confíes solo en el frontend)
        if (!correo || !contrasena) {
            return res.status(400).json({ 
                success: false, 
                mensaje: 'Correo y contraseña son obligatorios' 
            });
        }

        // Consulta parametrizada a PostgreSQL ($1 y $2 evitan inyección SQL)
        const query = 'SELECT id, correo FROM usuarios WHERE correo = $1 AND contrasena = $2';
        const { rows } = await db.query(query, [correo, contrasena]);

        // Si la base de datos no devuelve ninguna fila, las credenciales no coinciden
        if (rows.length === 0) {
            // El examen pide exactamente este mensaje si falla [cite: 36]
            return res.status(401).json({ 
                success: false, 
                mensaje: 'Credenciales incorrectas' 
            });
        }

        // Si son correctas permitir acceso [cite: 35]
        res.status(200).json({
            success: true,
            mensaje: 'Login exitoso',
            usuario: rows[0] // Devolvemos los datos del usuario (sin la contraseña)
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ 
            success: false, 
            mensaje: 'Error interno del servidor' 
        });
    }
};

module.exports = {
    login
};