const express = require('express');
const UserController = require('../controllers/userController');
const { validateUser, validateToken } = require('../middleware/validation');

const router = express.Router();

router.get('/', validateToken, UserController.getAllUsers);

router.get('/profile', validateToken, UserController.getProfile);

router.get('/:id', validateToken, UserController.getUserById);

router.put('/:id', validateToken, validateUser, UserController.updateUser);

router.delete('/:id', validateToken, UserController.deleteUser);

router.patch('/:id/preferences', validateToken, UserController.updatePreferences);

module.exports = router;
