var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoconnection = require('./config/mongoconnnection.json')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var joueurRouter = require('./routes/joueur');
var partieRouter = require('./routes/partie');

var app = express();
const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/joueurs',joueurRouter);
app.use('/parties',partieRouter);


//mongodb connection
mongoose.connect(mongoconnection.url)
.then(()=>{console.log("Connected to the database!")})
.catch((err) => {console.log("Cannot connect to the database!", err)});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
