// import modules
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');

// import routers
const authRouter = require('./auth');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// 공통 middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

/* passport middleware */
// express 앱이 사용할 수 있도록 passport를 초기화
app.use(passport.initialize());
// passport에서 이미 설정된 express session을 내부적으로 사용하도록 지시
// req.session이 생성되는 express-session 미들웨어 뒤에 연결해야
app.use(passport.session());

// 요청 경로에 따라 router 실행
app.use('/', authRouter);

// 404 에러처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러처리
app.use((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.send('오류 발생');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
