var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// MySQL 연결
var modelController = require('./models/modelController');
var conn = modelController.init();    // DB 초기화

// mysql query test
var person;
conn.query('select * from test', (err, rows, fields) => {
  if (err) throw err;
  console.log("\n\nsuccess query");
  person = {
    id: rows[0].id,
    name: rows[0].name,
  };
});

app.get('/api', (req, res) => {
  res.send(person);
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send("Capston Legeno");
});

app.listen(app.get('port'), () => {
  console.log("\n\n" + app.get('port') + " port connect");
});




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
