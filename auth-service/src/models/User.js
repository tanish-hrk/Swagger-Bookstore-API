const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: '1',
    username: 'admin',
    password: '12345678',
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

  static async create(userData) {
    const existingUser = users.find(u => 
      u.username === userData.username || u.email === userData.email
    );
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = new User({
      ...userData,
      password: hashedPassword
    });

    users.push(user);
    return user;
  }

  static findByUsername(username) {
    return users.find(u => u.username === username);
  }

  static findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static findById(id) {
    return users.find(u => u.id === id);
  }

  static getAll() {
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;