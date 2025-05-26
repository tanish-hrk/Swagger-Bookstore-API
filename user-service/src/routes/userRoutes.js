const express = require('express');
const UserController = require('../controllers/userController');
const { validateUser, validateToken } = require('../middleware/validation');

const router = express.Router();

// Get all users (admin only)
router.get('/', validateToken, UserController.getAllUsers);

// Get user profile
router.get('/profile', validateToken, UserController.getProfile);

// Get user by ID
router.get('/:id', validateToken, UserController.getUserById);

// Update user
router.put('/:id', validateToken, validateUser, UserController.updateUser);

// Delete user
router.delete('/:id', validateToken, UserController.deleteUser);

// Update user preferences
router.patch('/:id/preferences', validateToken, UserController.updatePreferences);

module.exports = router;
