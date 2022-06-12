const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    console.info('___new GoogleStrategy()');
    console.log('___google profile', profile);
    try {
      const exUser = await User.findOne({
        where: { sns_id: profile.id, provider: 'google' },
      });
      if (exUser) {
        console.log('___google exUser', exUser);
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.email,
          nickname: profile.displayName,
          sns_id: profile.id,
          provider: 'google',
        });
        await Point.create({user_id: newUser.user_id, point: 3000});
        console.log('___google newUser', newUser);
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);