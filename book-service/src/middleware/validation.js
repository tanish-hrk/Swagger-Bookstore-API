const { verifyToken } = require('../utils/jwt');

const validateBook = (req, res, next) => {
  const { title, author, isbn, price, description, stock } = req.body;

  if (!title || !author || !isbn || !price || !description || stock === undefined) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      message: 'Price must be a positive number'
    });
  }

  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({
      message: 'Stock must be a non-negative number'
    });
  }

  if (typeof isbn !== 'string' || isbn.length < 10) {
    return res.status(400).json({
      message: 'ISBN must be a valid string of at least 10 characters'
    });
  }

  next();
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};

module.exports = {
  validateBook,
  validateToken
}; 