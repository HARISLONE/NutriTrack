const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please provide a valid token.'
      });
    }
    
    try {
      // Validate JWT_SECRET exists in production
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret && process.env.NODE_ENV === 'production') {
        console.error('JWT_SECRET is not set in production environment');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error'
        });
      }
      
      const decoded = jwt.verify(token, jwtSecret || 'demo_secret_key');
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please login again.'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please login again.'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Token verification failed'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

exports.authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
