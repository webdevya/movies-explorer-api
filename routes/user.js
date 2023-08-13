const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getCurrentUser, updateUser } = require('../controllers/user');
const { userTextsRule } = require('../validation/rules');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: userTextsRule,
}), updateUser);

module.exports = router;
