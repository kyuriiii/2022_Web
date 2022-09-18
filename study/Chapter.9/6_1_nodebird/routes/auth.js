const express = require('express');
const bcrypt = require('bcrypt');

const passport = require('../passport/index.js');
const {isLoggedIn, isNotLoggedIn}  = require('./middleware');
const User = require('../models/user');

const router = expres.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({where: {email}});
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        console.info('__User.create(): ' + nick );
        const hash = await bcrypt.hash(password, 12);

        await User.create({
            email,
            nick,
            password: hash,

        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

/*
    local 회원가입
    > users 테이블에 존재하지 않는 user이면 create
    > 비밀번호는 bcrypt.hash로 암호화해서 저장
*/

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        console.info('__passport.authenticate()');
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }

        console.info('__req.login()');
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }) ( req, res, next);
});

// logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.redirect('/');
    });
});

// kakao
router.get('/kakao', passport.authenticate('kakao'));

/*
    kakao site login 후, 자동 redirect
    kakao 계정 정보를 이용하여 login or 회원가입/로그인
*/
router.get(
    'kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;