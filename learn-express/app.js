var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
//var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// pug view resolver
app.set('view engine', 'pug');

app.use(function(req,res,next){
	console.log(req.url, '미들웨어 추가1');
	next();
},function(req,res,next){
	console.log(req.url, '미들웨어 추가2');
	next();
});

//dev, short, common, combined
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
//내장 body-parser (ajax || form data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//raw, text 타입의 본문을 해석하려면 bodyparser 미들웨어를 추가해야함.
//app.use(bodyParser.raw());
//app.use(bodyParser.text());
app.use(cookieParser('my52%$#Sig$na!tu&re'));
app.use(session({
	resave : false,
	saveUninitialized:false,
	secret: 'my52%$#Sig$na!tu&re',
	//세션 쿠키 세팅
	cookie:{
		httpOnly : true,
		secure:false,
	},
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//모든 라우터를 거쳐도 찾지 못했다면..
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
