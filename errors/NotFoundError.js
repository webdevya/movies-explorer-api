const UserError = require('./UserError');
const { NOT_FOUND } = require('../utils/responseCodes');

module.exports = class NotFoundError extends UserError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND;
  }
};
