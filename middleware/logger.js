const winston = require('winston');
const expressWinston = require('express-winston');
const { LOG_PATH } = require('../config');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: `${LOG_PATH}/request.log` }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: `${LOG_PATH}/error.log` }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
