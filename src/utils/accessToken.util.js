const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
  
  // jwt.sign is a synchronous operation by default
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

module.exports = generateAccessToken;