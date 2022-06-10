const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const controller = require('../controller/Lecture');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", controller.getLectures);
router.get("/all", isLoggedIn, controller.getLectureAll);

module.exports = router;