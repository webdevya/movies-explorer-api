const NotFoundError = require('../errors/NotFoundError');
const { pageNotFoundText } = require('../utils/errorText');

module.exports.notFoundFunc = (req, res, next) => next(new NotFoundError(pageNotFoundText));
