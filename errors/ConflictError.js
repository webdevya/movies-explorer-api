const UserError = require('./UserError');
const { CONFLICT } = require('../utils/responseCodes');

module.exports = class ConflictError extends UserError {
  constructor(message, innerMessage = '') {
    super(message);
    this.innerMessage = innerMessage;
    this.name = 'ConflictError';
    this.statusCode = CONFLICT;
  }
};
