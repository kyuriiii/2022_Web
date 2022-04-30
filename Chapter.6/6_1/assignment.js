const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use((req,res,next) => {
    console.log(req.path);
    next();
});

app.get('/', (req,res) => {
    res.sendFile(path.join( __dirname,'./index.html'));
});
app.get('/users', (req,res) => {
    var array = [
        {name: 'Happy', age:6},
        {name: 'kyuri', age:24}
    ];

    if ( req.query ){ array.push(req.query); }

    res.json(array);
});
app.get('/user/:id', (req,res) => {
    res.send(`${req.params.id} 님 반갑습니다.`);
});

app.get('*', (req,res) => {
    res.redirect('/');
});

app.listen(app.get('port'), ()=>{
    console.log(`http:/localhost:${app.get('port')}에서 대기중`);
});