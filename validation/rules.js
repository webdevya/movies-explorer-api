const { Joi } = require('celebrate');
const { urlRegex } = require('./regex');

const stringRuleRequired = Joi.string().required();
const stringRuleRequiredWithLen = Joi.string().required().min(2).max(30);
const urlRuleRequired = Joi.string().required().pattern(urlRegex);
const idRule = Joi.string().required().hex().length(24);
const emailRule = Joi.string().required().email();
const pwdRule = Joi.string().required().min(1);
const numberRule = Joi.number().required();

const userTextsRequiredObj = { name: stringRuleRequiredWithLen };
const pwdObj = { password: pwdRule };
const emailObj = { email: emailRule };
const movieObj = {
  country: stringRuleRequired,
  director: stringRuleRequired,
  duration: stringRuleRequired,
  year: stringRuleRequired,
  description: stringRuleRequired,
  image: urlRuleRequired,
  trailerLink: urlRuleRequired,
  thumbnail: urlRuleRequired,
  movieId: numberRule,
  nameRU: stringRuleRequired,
  nameEN: stringRuleRequired,
};

const userRule = Joi.object().keys({ ...userTextsRequiredObj, ...emailObj, ...pwdObj });

const loginRule = Joi.object().keys({ ...emailObj, ...pwdObj });

const userTextsRule = Joi.object().keys({ ...emailObj, ...userTextsRequiredObj });

const userIdRule = Joi.object().keys({ userId: idRule });

const movieIdRule = Joi.object().keys({ movieId: idRule });

const movieRule = Joi.object().keys(movieObj);

module.exports = {
  userRule, loginRule, movieIdRule, movieRule, userIdRule, userTextsRule,
};
