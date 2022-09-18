const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    console.info('___passport.serializeUser()');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.info('___passport.deserializeUser()');
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};

module.exports = passportConfig;
