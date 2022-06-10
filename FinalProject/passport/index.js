const passport = require('passport');
const kakaoStrategy = require('./kakaoStrategy');
const googleStrategy = require('./googleStrategy');
const { User } = require('../models');

passport.serializeUser((user, done) => {
  console.info('___passport.serializeUser()');
  done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {
  console.info('___passport.deserializeUser()');
  User.findOne({ where: { user_id } })
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

passport.use(kakaoStrategy);
passport.use(googleStrategy);

module.exports = passport;