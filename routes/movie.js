const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  deleteMovie, getAllMovies, createMovie,
} = require('../controllers/movie');

const { movieIdRule, movieRule } = require('../validation/rules');

router.get('/', getAllMovies);

router.delete('/:movieId', celebrate({ params: movieIdRule }), deleteMovie);

router.post('/', celebrate({ body: movieRule }), createMovie);

module.exports = router;
