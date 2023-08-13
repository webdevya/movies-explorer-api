const dotenv = require('dotenv');

dotenv.config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/moviesdb',
  JWT_SECRET = 'fffff71ac2582b2d853ff2afff136731a971798d24ebdd6eb80c9fe6adffffff',
  LOG_PATH = './logs',
  ALLOWED = '*',
} = process.env;

module.exports = {
  PORT, DB_URL, JWT_SECRET, LOG_PATH, ALLOWED,
};
