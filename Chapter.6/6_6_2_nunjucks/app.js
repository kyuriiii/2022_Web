const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html'); // njk 확장자로 설정시 html을 njk로 변경

// views가 폴더 경로
nunjucks.configure('views', {
    express:app,
    watch: true,
});

app.get('/', (req, res) => {
    res.render('index', {title: "Title"});
});

app.get('/layout', (req, res) => {
    res.render('layout', {title: "layout"});
});

app.get('/main', (req, res) => {
    res.render('main', {title: "main"});
});

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}에서 대기중`);
});