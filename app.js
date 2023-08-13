const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { errorConsole, errorResponder } = require('./middleware/errorMiddleware');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT, DB_URL, ALLOWED } = require('./config');

const app = express();

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
