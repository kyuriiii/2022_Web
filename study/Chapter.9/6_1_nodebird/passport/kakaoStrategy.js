const KaKaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = new KaKaoStrategy(
    {
        clientID : process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        console.info('___new KakaoStrategy()');
        console.log('___kakao profile', profile);
        try {
            const exUser = await User.findOne({
                where : {snsId : profile.id, provider: 'kakao'},
            });
            if( exUser) {
                console.log('___kakao exUser', exUser);
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email : profile._json && profile._json.kakao_account.email,
                    nick : profile.displayName,
                    snsId : profile.id,
                    provider : 'kakao',
                });
                console.log('___kakao newUser', newUser);
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
);

/*
  카카오전략
  - DB에 저장된 사용자이면, 로그인
  - 저장되지 않은 사용자이면, DB에 생성 및 로그인
  - clientID: 카카오앱 아이디
  - callbackURL: 카카오 로그인 후, 카카오가 결과를 전송해줄 URL
  -  accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰 ( 사용 안함 )
  - profile: 카카오ㅗ가 보내준 사용자 정보 | profile의 정보를 바탕으로 회원가입
*/