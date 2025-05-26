const User = require('../models/User');

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = User.findAll();
      res.json({
        users: users.map(user => user.toJSON())
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = User.findById(parseInt(id));

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.json({
        user: user.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      // Don't allow updating sensitive fields
      delete userData.password;
      delete userData.role;

      const updatedUser = User.update(parseInt(id), userData);
      
      if (!updatedUser) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.json({
        message: 'User updated successfully',
        user: updatedUser.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = User.delete(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.json({
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  // Update user preferences
  static async updatePreferences(req, res) {
    try {
      const { id } = req.params;
      const { preferences } = req.body;

      const user = User.findById(parseInt(id));
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      const updatedUser = User.update(parseInt(id), {
        preferences: { ...user.preferences, ...preferences }
      });

      res.json({
        message: 'Preferences updated successfully',
        user: updatedUser.toJSON()
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = User.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.json({
        user: user.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = UserController;
