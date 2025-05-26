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
  constructor(userData) {
    this.id = userData.id || uuidv4();
    this.username = userData.username;
    this.password = userData.password;
    this.email = userData.email;
    this.role = userData.role || 'user';
    this.createdAt = userData.createdAt || new Date().toISOString();
  }

  // Create new user
  static async create(userData) {
    // Check if user already exists
    const existingUser = users.find(u => 
      u.username === userData.username || u.email === userData.email
    );
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = new User({
      ...userData,
      password: hashedPassword
    });

    users.push(user);
    return user;
  }

  // Find user by username
  static findByUsername(username) {
    return users.find(u => u.username === username);
  }

  // Find user by email
  static findByEmail(email) {
    return users.find(u => u.email === email);
  }

  // Find user by ID
  static findById(id) {
    return users.find(u => u.id === id);
  }

  // Get all users (without passwords)
  static getAll() {
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  // Verify password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Get user without password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;