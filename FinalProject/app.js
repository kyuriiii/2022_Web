const express = require("express");
const app = express();
const morgan = require('morgan');
const http = require("http").Server(app);
const path = require("path");
const dotenv = require("dotenv");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

dotenv.config({ path: path.join(__dirname, "./config/.env") });

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views",  path.join( __dirname + "/views") );
app.use(morgan('dev'));
app.use("/temp", express.static(__dirname + "/temp"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/static", express.static(path.join(__dirname + "/static")));
app.use("/public", express.static(path.join(__dirname + "/public")));
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
app.use(passport.initialize());
app.use(passport.session());

// var postRouter=require("./routes/postRouter");
// app.use("/", postRouter);
var authRouter=require("./routes/authRouter");
app.use("/auth", authRouter);
// var lectureRouter=require("./routes/lectureRouter");
// app.use("/lecture", lectureRouter);
// var payRouter=require("./routes/payRouter");
// app.use("/pay", payRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

http.listen( process.env.PORT_NUMBER, () => {
    console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
});