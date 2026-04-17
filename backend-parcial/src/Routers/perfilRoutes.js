const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

router.get('/', perfilController.obtenerPerfil);       // GET /api/perfil
router.post('/', perfilController.crearPerfil);        // POST /api/perfil
router.put('/', perfilController.actualizarPerfil);    // PUT /api/perfil

module.exports = router;