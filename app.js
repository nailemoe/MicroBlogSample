var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var setting = require('./setting');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: setting.cookieSecret,
                  resave: false,
                  saveUninitialized: true,
                  store: new mongoStore({url: setting.url})}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function(req,res,next){
  res.locals.user=req.session.user;
  var err = req.flash('error');
  var success = req.flash('success');
  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;
  next();
});

// starting routing
app.use('/', index);
app.use('/users', users);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
