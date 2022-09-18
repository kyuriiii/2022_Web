const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let fakeUser = {
  username: 'test',
  password: '1234',
  email: 'test@test',
};

// 로그인 성공 시 호출. 사용자 식별자를 req.session에 저장
passport.serializeUser((user, done) => {
  console.log('serializeUser - user:', user);
  done(null, user.username);
});

// 로그인 후 서버 요청시마다 req.session에 저장된 사용자 식별자를 이용해 사용자 정보를 읽어 req.user에 저장
passport.deserializeUser((id, done) => {
  console.log('deserializeUser - id:', id);
  done(null, fakeUser);
});

passport.use(
  new LocalStrategy(
    {
      // option
      usernameField: 'username',
      passwordField: 'password',
      session: true,
      passReqToCallback: false,
    },
    (username, password, done) => {
      if (username === fakeUser.username) {
        // username OK
        if (password === fakeUser.password) {
          // password OK
          console.log('LocalStrategy - username & password ok');
          return done(null, fakeUser);
        } else {
          return done(null, false, { message: 'password incorrect' });
        }
      } else {
        return done(null, false, { message: 'username incorrect' });
      }
    }
  )
);

module.exports = passport;
