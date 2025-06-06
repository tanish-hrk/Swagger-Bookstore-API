const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'ABCDE';
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
module.exports = {
  verifyToken
}; 