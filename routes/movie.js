const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  deleteMovie, getAllMovies, createMovie,
} = require('../controllers/movie');

const { authRule, movieIdRule, movieRule } = require('../validation/rules');

router.get('/', celebrate({ headers: authRule }), getAllMovies);

router.delete('/:movieId', celebrate({
  params: movieIdRule,
  headers: authRule,
}), deleteMovie);

router.post('/', celebrate({
  body: movieRule,
  headers: authRule,
}), createMovie);

module.exports = router;
