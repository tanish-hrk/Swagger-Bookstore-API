const express = require('express');
const AuthController = require('../controllers/authController');
const { validateRegister, validateLogin, validateToken } = require('../middleware/validation');

const router = express.Router();

// Register new user
router.post('/register', validateRegister, AuthController.register);

// Login user
router.post('/login', validateLogin, AuthController.login);

// Validate token
router.get('/validate', validateToken, AuthController.validateToken);

// Logout (just for API completeness)
router.post('/logout', AuthController.logout);
