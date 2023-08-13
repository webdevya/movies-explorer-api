const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { errorConsole, errorResponder } = require('./middleware/errorMiddleware');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

const {
  PORT, DB_URL, ALLOWED, RATE_LIMIT,
} = require('./config');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: RATE_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const corsOptions = {
  origin: ALLOWED,
  optionsSuccessStatus: 200,
};

app.use(requestLogger);
app.use(cors(corsOptions));

// app.use('/', require('./routes/index'));

app.use('/', require('./routes/auth'));

app.use(errors());
app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));
app.use('*', require('./routes/notFound'));

app.use(errorLogger);

app.use(errors());
app.use(errorConsole);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
