const UserError = require('./UserError');
const { FORBIDDEN } = require('../utils/responseCodes');
const { forbiddenErrorText } = require('../utils/errorText');

module.exports = class ForbiddenError extends UserError {
  constructor() {
    super(forbiddenErrorText);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN;
  }
};
