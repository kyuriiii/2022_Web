const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const controller = require('../controller/User');

const router = express.Router();

router.get('/', controller.getUser);

module.exports = router;