'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const cors = require('cors');

const usersApi = require('./api/routes/users');
const matchesApi = require('./api/routes/matches');

const indexApp = require('./app/routes/index');
const usersApp = require('./app/routes/users');
const matchesApp = require('./app/routes/matches');

const app = express();

// mongodb connection
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/dart-game');


// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'app', 'public')));
app.use(express.static(path.join(__dirname, 'app', 'public')));

// cross domain
app.use(cors())

// app routes
app.use('/', indexApp);
app.use('/users', usersApp);
app.use('/matches', matchesApp);

// api routes
app.use('/api/users', usersApi);
app.use('/api/matches', matchesApi);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
