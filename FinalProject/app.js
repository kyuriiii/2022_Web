const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const dotenv = require("dotenv");

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views" );
app.use(morgan('dev'));
app.use("/temp", express.static(__dirname + "/temp"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/static", express.static(__dirname + "/static"));
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

dotenv.config();

var postRouter=require("./routes/postRouter");
app.use("/", postRouter);
var userRouter=require("./routes/userRouter");
app.use("/user", userRouter);
var lectureRouter=require("./routes/lectureRouter");
app.use("/lecture", lectureRouter);
var payRouter=require("./routes/payRouter");
app.use("/pay", payRouter);

http.listen( process.env.PORT_NUMBER, () => {
    console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
});