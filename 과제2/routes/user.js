const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

var users;

router.get('/', (req,res) => {
    if ( req.session.user_ID != null ) res.redirect('/profile');
    else res.redirect('/login');
});

router.get('/login', async (req,res) => {
    users = JSON.parse( await fs.readFile(path.join(__dirname,'../public/users.json')) );
    res.render('login');
});

router.post('/login', (req,res) => {
    const { ID, pw } = req.body;
    if( users[ID].pw != pw ) res.status(400).send({msg: process.env.LOGIN_FAIL});
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
            res.redirect('profile');
        });
    }
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/register', async (req,res) => {
    const { ID, pw, name, nickname, contact } = req.body;

    if ( users[ID] != null ) res.redirect('login');
    users[ID] = { pw, name, nickname, contact };

    await fs.writeFile(
        path.join(__dirname, '../public/users.json'),
        JSON.stringify(users)
    );
    
    await res.redirect('login');
});

router.get('/profileAll', (req,res) => {
    res.render('profileAll', { users: users });
});

router
    .route('/profile')
    .get((req,res) => {
        if ( !req.cookies.is_login ) res.redirect('login');

        const ID = req.session.user_ID;
        if ( users[ID] != null ) res.redirect('login');

        res.render('register', { user: users[ID] });
    })
    .put( async (req,res) => {
        if ( !req.cookies.is_login ) res.redirect('login');
        const ID = req.session.user_ID;

        if ( ID != req.params.ID ) res.redirect('login');
        
        const { pw, name, nickname, contact } = req.body;
        users[ID] = { pw, name, nickname, contact };

        await fs.writeFile(
            path.join(__dirname, '../public/users.json'),
            JSON.stringify(users)
        );

        res.send('success');
    })
    .delete( async (req,res) => {
        if ( !req.cookies.is_login ) res.redirect('login');
        const ID = req.session.user_ID;

        if ( ID != req.params.ID ) res.redirect('login');

        delete users[ID];

        await fs.writeFile(
            path.join(__dirname, '../public/users.json'),
            JSON.stringify(users)
        );
        res.end();
    });

router.get('/logout', (req,res) => {
    res.clearCookie('is_login', true, {
        httpOnly: true,
        path: '/',
    });

    delete req.session.user_ID;
});

module.exports = router;