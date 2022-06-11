const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const controller = require('../controller/User');

const router = express.Router();

router.get('/', controller.getUser);
router.get('/mypage', isLoggedIn, controller.mypage);
router.post('/myinfo', isLoggedIn, controller.myinfo);

module.exports = router;