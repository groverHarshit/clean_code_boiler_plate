var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var app = express();
app.listen(process.env.PORT || 3000, () => console.log(`Listening on PORT => ${process.env.PORT || 3000}`))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const fs = require('fs');

console.log(' ******** Checking for directories ********')
if (!fs.existsSync(path.join(__dirname, 'public', 'uploads'))) {
  console.log(' ******** Creating Directories ********')
  fs.mkdirSync(path.join(__dirname, 'public/uploads'));
  fs.mkdirSync(path.join(__dirname, 'public', 'uploads', 'images'));
  console.log(' ******** Directories created ********')
} else if (!fs.existsSync(path.join(__dirname, 'public', 'uploads', 'images'))) {
  console.log(' ******** Creating Directories ********')
  fs.mkdirSync(path.join(__dirname, 'public', 'uploads', 'images'));
  console.log(' ******** Directories created ********')
}
console.log(' ******** Directories operation completed ********')

require('./config/database');

const set_routes = require('./routes');
set_routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
