const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login', {title: 'Login'});
});

app.get('/visit', (req, res) => {
    res.render('visit', {title: '방문자 기록'});
});

app.get('/upload', (req, res) => {
    res.render('upload', {title: 'File Upload'});
});

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}에서 대기중`);
});