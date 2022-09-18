const express = require('express');
const app = express();
const path = require('path');

app.use((req,res,next) => {
    console.log(req.path);
    next();
});

app.get('/', (req,res,next) => {
    // res.send( "Hello Express!" );
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(path.join( __dirname,'./index.html'));
});

app.get('/users', (req,res,next) => {
    res.json({name: 'Happy', age:6});
})

app.get('/user/:id', (req,res) => {
    // res.json(req.params);
    res.send(`${req.params.id} 님 반갑습니다.`);
});

app.get('*', (req,res,next) => {
    // res.status(404).send(`${req.path} is not found`);
    // res.status(404).end();
    // res.sendStatus(404);
    // res.redirect('/');
    if ( req.query ){
        console.log(req.query);
        res.send('query test');
    } else res.redirect('/');
});

app.listen(3000, () => {
    console.log('http://localhost:3000에서 대기중');
});