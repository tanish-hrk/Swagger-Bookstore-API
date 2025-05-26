const validateRegister = (req, res, next) => {
    const { username, password, email } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).json({
        message: 'Username, password, and email are required'
      });
    }
  
    if (username.length < 3) {
      return res.status(400).json({
        message: 'Username must be at least 3 characters long'
      });
    }
  
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address'
      });
    }
  
    next();
  };
  
  const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }
  
    next();
  };
  
  const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }
  
    req.token = token;
    next();
  };
  
  module.exports = {
    validateRegister,
    validateLogin,
    validateToken
  };