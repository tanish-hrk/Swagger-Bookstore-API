const User = require('../models/User');
const { generateToken, verifyToken } = require('../utils/jwt');

class AuthController {
  // Register new user
  static async register(req, res) {
    try {
      const { username, password, email, role } = req.body;

      const user = await User.create({
        username,
        password,
        email,
        role: role || 'user'
      });

      const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: user.toJSON(),
        token
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = User.findByUsername(username);
      if (!user) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      const isValidPassword = await user.verifyPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role
      });

      res.json({
        message: 'Login successful',
        user: user.toJSON(),
        token
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Validate token
  static async validateToken(req, res) {
    try {
      const decoded = verifyToken(req.token);
      const user = User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          message: 'User not found'
        });
      }

      res.json({
        valid: true,
        user: user.toJSON()
      });
    } catch (error) {
      res.status(401).json({
        valid: false,
        message: 'Invalid token'
      });
    }
  }

  // Logout (client-side token removal)
  static async logout(req, res) {
    res.json({
      message: 'Logout successful. Please remove the token from client side.'
    });
  }
}

module.exports = AuthController;