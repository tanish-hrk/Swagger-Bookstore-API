const express = require('express');
const AuthController = require('../controllers/authController');
const { validateRegister, validateLogin, validateToken } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateRegister, AuthController.register);

router.post('/login', validateLogin, AuthController.login);

router.get('/validate', validateToken, AuthController.validateToken);

router.post('/logout', AuthController.logout);
