const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    console.info('___new LocalStrategy()');
    try {
      const exUser = await User.findOne({ where: { email } });
      console.log( exUser );
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          console.log( result );
          done(null, exUser);
        } else {
          done("비밀번호가 일치하지 않습니다.");
          return false;
        }
      } else {
        done("가입되어 있지 않은 이메일입니다.");
      }
    } catch (error) {
      done(error);
    }
  }
);
