const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

var users = [];

router.get('/', async (req,res) => {
    console.log( "root - ", req.session.user_ID );
    console.log( "root - ", req.signedCookies.is_login );
    if ( req.signedCookies.is_login != null ) res.redirect('/profile');
    else {
        users = JSON.parse( await fs.readFile(path.join(__dirname,'../public/users.json')) );
        res.render('login');
    }
});

router.get('/login', async (req,res) => {
});

router.post('/login', (req,res) => {
    const { ID, pw } = req.body;
    if( users[ID] == null || users[ID].pw != pw ) res.status(400).send({msg: process.env.LOGIN_FAIL});
    else {
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
    const { ID, pw, name, nickname, contact } = req.body;

    if ( users[ID] != null ) {
        res.redirect('/');
        return false;
    }
    users[ID] = { pw, name, nickname, contact };

    await fs.writeFile(
        path.join(__dirname, '../public/users.json'),
        JSON.stringify(users)
    );
    
    await res.redirect('/');
});

router.get('/profileAll', (req,res) => {
    res.render('profileAll', { users: users });
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