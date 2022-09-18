const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use("/public", express.static(path.join(__dirname,'public')));
app.use("/img", express.static(path.join(__dirname,'img')));
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
            maxAge: 600000,
        },
        name: process.env.SESSION_NAME
    })
);

app.use('/', userRouter);
app.use('/upload',uploadRouter);

app.use((req, res, next) => {
    res.status(404).send(`${req.method} ${req.path} is NOT FOUND`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');;
});

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}에서 대기중`);
});
