const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const { dataHandler } = require('../utils/dataHandler');

const { JWT_SECRET } = require('../config');
const { CREATED } = require('../utils/responseCodes');

const {
  userNotFoundText,
  userValidationErrorText,
  userConflictErrorText,
} = require('../utils/errorText');

const viewModelUser = (data) => {
  const res = {
    name: data.name, _id: data._id, email: data.email,
  };
  return res;
};

const userDataHandler = dataHandler(viewModelUser, userNotFoundText);

module.exports.createUserViewModel = (data) => viewModelUser(data);

const getUserById = (id, res, next) => {
  User.findById(id)
    .then((data) => {
      userDataHandler(res, data);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })).then((data) => res.status(CREATED).send(viewModelUser(data)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(userConflictErrorText, err.message));
      } else if (err instanceof mongoose.Error) {
        next(new ValidationError(userValidationErrorText, err.message));
      } else next(err);
    });
};

const updateUserData = (req, res, next, forUpdate) => {
  User.findByIdAndUpdate(req.user._id, forUpdate, { new: true, runValidators: true })
    .then((data) => {
      userDataHandler(res, data);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(userValidationErrorText, err.message));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  updateUserData(req, res, next, { name, email });
};

module.exports.getCurrentUser = (req, res, next) => {
  getUserById(req.user._id, res, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
