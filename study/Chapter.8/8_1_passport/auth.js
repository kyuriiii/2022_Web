const express = require('express');
const path = require('path');
const passport = require('./passportmiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    const html = `
    <p>${req.user.username}(${req.user.email})님 로그인되었습니다!</p>
    <a href="/logout">로그아웃</a>
    `;
    res.send(html);
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

/* Passport Login */
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
