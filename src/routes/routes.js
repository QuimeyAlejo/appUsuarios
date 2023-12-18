const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController.js');

// Rutas de usuario
router.post('/user/create-account', UserController.createAccount);
router.get('/user/:id', UserController.getUserById);
router.get('/user/email/:email', UserController.getUserByEmail);
router.delete('/user/:id', UserController.deleteUserById);
router.delete('/user/email/:email', UserController.deleteUserByEmail);
router.get('/users', UserController.getAllUser);

module.exports = router;
