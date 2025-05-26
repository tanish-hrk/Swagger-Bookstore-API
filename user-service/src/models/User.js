const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let users = [
  {
    id: '1',
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    email: 'admin@bookstore.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

class User {
  constructor(id, username, email, role, preferences = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.preferences = preferences;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(userData) {
    const id = users.length + 1;
    const user = new User(
      id,
      userData.username,
      userData.email,
      userData.role || 'user',
      userData.preferences || {}
    );
    users.push(user);
    return user;
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static findByUsername(username) {
    return users.find(user => user.username === username);
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findAll() {
    return users;
  }

  static update(id, userData) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;

    const updatedUser = {
      ...users[index],
      ...userData,
      updatedAt: new Date()
    };
    users[index] = updatedUser;
    return updatedUser;
  }

  static delete(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      preferences: this.preferences,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User;