const express = require('express');
const router = express.Router();
const { createAcount } = require('../controllers/userController');

// Ruta para la creación de cuentas
router.post('/create-account', createAcount);

module.exports = router;