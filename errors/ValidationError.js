const UserError = require('./UserError');
const { BAD_REQUEST } = require('../utils/responseCodes');

module.exports = class ValidationError extends UserError {
  constructor(message, innerMessage) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = BAD_REQUEST;
    this.innerMessage = innerMessage;
  }
};
