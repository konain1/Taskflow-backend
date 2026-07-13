const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const verifyAccessToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};