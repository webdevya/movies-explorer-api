const mongoose = require('mongoose');
const validator = require('validator');

const linkValidator = {
  validator: (e) => validator.isURL(e, { protocols: ['http', 'https'], require_tld: true, require_protocol: true }),
  message: (props) => `${props.value} не является ссылкой!`,
};

/*
country — страна создания фильма. Обязательное поле-строка.
director — режиссёр фильма. Обязательное поле-строка.
duration — длительность фильма. Обязательное поле-число.
year — год выпуска фильма. Обязательное поле-строка.
description — описание фильма. Обязательное поле-строка.
image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
thumbnail — миниатюрное изображение постера к фильму. О
  бязательное поле-строка. Запишите её URL-адресом.
owner — _id пользователя, который сохранил фильм. Обязательное поле.
movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
  Обязательное поле в формате number.
nameRU — название фильма на русском языке. Обязательное поле-строка.
nameEN — название фильма на английском языке. Обязательное поле-строка.
*/

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', userSchema);
