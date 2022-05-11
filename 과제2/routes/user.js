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
    users = JSON.parse( await fs.readFile(path.join(__dirname,'public/users.json')) );
    res.render('login');
});

router.post('/login', (req,res) => {
    const { ID, pw } = req.body;
    if( users[ID].pw != pw ) res.status(400).send({msg: process.env.LOGIN_FAIL});
    else {
        req.session.user_ID= ID;
        res.send({msg: process.env.LOGIN_SUCCESS});
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
        path.join(__dirname, 'public/users.json'),
        JSON.stringify(users)
    );
    
    await res.redirect('login');
});

router.get('/profile/:user_ID', (req,res) => {
    const ID = req.params.user_ID;

    if ( users[ID] != null ) res.redirect('login');

    res.render('register', { user: users[ID] });
});