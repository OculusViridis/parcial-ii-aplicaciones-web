const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos la ruta POST /login
router.post('/login', authController.login);

module.exports = router;