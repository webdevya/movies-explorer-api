const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');
const { errorHandler } = require('./errorMiddleware');
const { authRequiredText } = require('../utils/errorText');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    errorHandler(new AuthError(authRequiredText), res);
    return;
  }

  if (!JWT_SECRET) errorHandler(Error('JWT_SECRET not found in environment (auth.js)'));

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    errorHandler(new AuthError(authRequiredText, err.message), res);
    return;
  }

  req.user = payload;

  next();
};
