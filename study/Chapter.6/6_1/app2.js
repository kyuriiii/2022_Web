const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use((req,res,next) => {

});

app.get('/', (req,res) => {

});
app.get('/users', (req,res) => {

});
app.get('/user/:id', (req,res) => {

});

app.listen(app.get('port'), ()=>{
    console.log(`http:/localhost:${app.get('port')}에서 대기중`);
});