const express = require('express');

const passport = require('../passport/index.js');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const controller = require('../controller/Auth');
const cst = require('../config/const.js');

const router = express.Router();

router.get('/', controller.login);
router.get('/join', controller.joinView);
router.post('/join', controller.join);
router.get('/logout', isLoggedIn, controller.logout);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      res.status(cst.ERRORCODE_BAD_REQUEST).send({msg: authError});
      return false;
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.log( loginError );
        return res.status(cst.ERRORCODE_BAD_REQUEST).send({msg: loginError});
      }
      console.log( "success" );
      return res.send(true);
    });
  })(req, res, next);
});

router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/google', passport.authenticate('google',{ scope: ['profile','email']}));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;