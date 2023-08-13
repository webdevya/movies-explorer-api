const mongoose = require('mongoose');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Movie = require('../models/movie');
const { createUserViewModel } = require('./user');

const { CREATED } = require('../utils/responseCodes');
const { movieNotFoundText, movieValidationErrorText } = require('../utils/errorText');

const viewModelMovie = (data) => {
  const res = {
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: data.image,
    trailerLink: data.trailerLink,
    thumbnail: data.thumbnail,
    movieId: data.movieId,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    _id: data._id,
    owner: createUserViewModel(data.owner),
    createdAt: data.createdAt,
  };
  return res;
};

const viewModelMovieArray = (data) => {
  const res = data.map((item) => viewModelMovie(item));
  return res;
};

// const movieDataHandler = dataHandler(viewModelMovie, notFoundText);

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  }).then((data) => {
    res.status(CREATED).send(viewModelMovie(data));
  })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(movieValidationErrorText, err.message));
      } else next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).then((mve) => {
    if (!mve) throw (new NotFoundError(movieNotFoundText));
    if (!mve.owner._id.equals(req.user._id)) throw (new ForbiddenError());
    return mve.deleteOne();
  }).then((del) => res.send(del))
    .catch(next);
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({}).populate('owner').then((data) => {
    res.send(viewModelMovieArray(data));
  })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new ValidationError(movieValidationErrorText, err.message));
      } else next(err);
    });
};
