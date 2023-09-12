const dotenv = require('dotenv');

dotenv.config();

const {
  PORT_ENV,
  DB_URL_ENV,
  JWT_SECRET_ENV,
  LOG_PATH_ENV,
  ALLOWED_ENV,
  RATE_LIMIT_ENV,
  NODE_ENV,
} = process.env;

const PORT_LOCAL = 3002;
const DB_URL_LOCAL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET_LOCAL = 'fffff71ac2582b2d853ff2afff136731a971798d24ebdd6eb80c9fe6adffffff';
const LOG_PATH_LOCAL = './logs';
const ALLOWED_LOCAL = '*';
const RATE_LIMIT_LOCAL = 60;

const PORT = NODE_ENV === 'production' && PORT_ENV ? PORT_ENV : PORT_LOCAL;
const DB_URL = NODE_ENV === 'production' && DB_URL_ENV ? DB_URL_ENV : DB_URL_LOCAL;
const JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET_ENV ? JWT_SECRET_ENV : JWT_SECRET_LOCAL;
const LOG_PATH = NODE_ENV === 'production' && LOG_PATH_ENV ? LOG_PATH_ENV : LOG_PATH_LOCAL;
const ALLOWED = NODE_ENV === 'production' && ALLOWED_ENV ? ALLOWED_ENV : ALLOWED_LOCAL;
const RATE_LIMIT = NODE_ENV === 'production' && RATE_LIMIT_ENV ? RATE_LIMIT_ENV : RATE_LIMIT_LOCAL;

module.exports = {
  PORT, DB_URL, JWT_SECRET, LOG_PATH, ALLOWED, RATE_LIMIT,
};
