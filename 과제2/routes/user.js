const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// users.json 파일을 읽어와 users에 대한 정보를 저장할 배열
var users = [];

router.get('/', async (req,res) => {
    // 로그인 된 상태면 profile 페이지를, 로그인 되지 않았다면 로그인 가능 페이지를 보여준다.
    if ( req.signedCookies.is_login != null ) res.redirect('/profile');
    else res.redirect('/login');
});

router.get('/login', (req,res) => {
    console.log( "login : ", users );
    res.render('login');
});


router.post('/login', async(req,res) => {
    users = await JSON.parse( await fs.readFile(path.join(__dirname,'../public/users.json')) );
    
    const { ID, pw } = req.body;
    console.log( "login1 : ", users[ID] );
    console.log( "login2 : ", pw );
    if( users[ID] == null || users[ID].pw != pw ) {
        // 로그인 실패 메시지를 띄우고 새로고침
        res.send( `
            <script>
                alert( "${process.env.LOGIN_FAIL}" );
                document.location.href="/";
            </script>
        `);
    } else {
        // cookie에 로그인 된 상태 저장, sessino에 user의 ID 저장
        res.cookie('is_login', true, {
            // expores: new Date(Date.now() + 3000),
            maxAge: 600000,
            httpOnly: true,
            secure: false,
            path: '/',
            signed: true
        });

        req.session.user_ID= ID;
        req.session.save(function(){
            res.redirect('/profile');
        });
    }
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/register', async (req,res) => {
    users = JSON.parse( await fs.readFile(path.join(__dirname,'../public/users.json')) );
    const { ID, pw, name, nickname, contact } = req.body;

    console.log(req.body);
    if ( users[ID] != null ) {
        res.redirect('/');
        return false;
    }
    users[ID] = { pw, name, nickname, contact };
    await fs.writeFile(
        path.join(__dirname, '../public/users.json'),
        JSON.stringify(users)
    );
    console.log( "register : ", users );
    
    await res.redirect('/login');
});

router.get('/profile', (req,res) => {
        if ( !req.signedCookies.is_login ) {
            res.redirect('/');
            return false;
        }

        const ID = req.session.user_ID;
        console.log( ID );
        if ( users[ID] == null ) res.redirect('/logout');

        res.render('profile', { ID: ID, user: users[ID] });
    });
router
    .route('/profile/:ID')
    .put( async (req,res) => {
        if ( !req.signedCookies.is_login ) {
            res.redirect('/');
            return false;
        }
        const ID = req.session.user_ID;
        console.log( "ID : ", ID);

        if ( ID != req.params.ID ) {
            res.redirect('/');
            return false;
        }
        
        const { pw, name, nickname, contact } = req.body;
        users[ID] = { pw, name, nickname, contact };

        await fs.writeFile(
            path.join(__dirname, '../public/users.json'),
            JSON.stringify(users)
        );
        res.send("성공");
    })
    .delete( async (req,res) => {
        // 저장된 cookie와 session을 모두 삭제
        // 사용자 정보 삭제
        if ( !req.signedCookies.is_login ) {
            res.redirect('/');
            return false;
        }
        const ID = req.session.user_ID;

        if ( ID != req.params.ID ) {
            res.redirect('/');
            return false;
        }

        delete users[ID];

        await fs.writeFile(
            path.join(__dirname, '../public/users.json'),
            JSON.stringify(users)
        );
        
        res.clearCookie('is_login', true, {
            httpOnly: true,
            path: '/',
        });
    
        delete req.session.user_ID;
        
        res.send("성공");        
    });

router.get('/logout', (req,res) => {
    res.clearCookie('is_login', true, {
        httpOnly: true,
        path: '/',
    });

    delete req.session.user_ID;

    res.redirect('/');
});

module.exports = router;