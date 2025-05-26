const { verifyToken } = require('../utils/jwt');

const validateUser = (req, res, next) => {
  const { username, email } = req.body;

  if (username && (typeof username !== 'string' || username.length < 3)) {
    return res.status(400).json({
      message: 'Username must be a string with at least 3 characters'
    });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({
      message: 'Invalid email format'
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

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  validateUser,
  validateToken
}; 