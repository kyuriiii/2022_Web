// app_v4.js와 같이 실행되는 파일

// routes/login.js
// 로그인을 처리하는 라우터
// form tag의 method=get/post 경우에 대한 req.query/req.body 테스트

const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res) => {
    console.log(req.signedCookies);
    if ( req.signedCookies.admit ) res.send('<h1>Login Success</h1>');
    else res.redirect('/login');
});

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/admit', (req,res) => {
    const { login, password } = req.body; 
    console.log(req.body);
    console.log( login, password );

    if ( login == 'guest' && password == '7777' ){
        res.cookie('admit', true, {
            // expores: new Date(Date.now() + 3000),
            maxAge: 600000,
            httpOnly: true,
            secure: false,
            path: '/',
            signed: true, // 서명 쿠키 설정
        });

        // res.clearCookie('admit', true, {
        //     httpOnly: true,
        //     path: '/',
        // });

        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;