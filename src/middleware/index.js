const jwt = require('jsonwebtoken');

function hasRole(...role) {
  const checkToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'no token, authorization denied',
      });
    }
    try {
      const removeBearer = token.slice(7, token.length);
      const decoded = jwt.verify(removeBearer, process.env.DATABASE_URL);
      if (!role.includes(decoded.user.role)) {
        return res.status(403).json({
          status: 'error',
          message: 'your role is not permitted access',
        });
      }
      req.user = decoded.user;
      next();
      return 'success';
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
  };
  return checkToken;
}

module.exports = hasRole;
