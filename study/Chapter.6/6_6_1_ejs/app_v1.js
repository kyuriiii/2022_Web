const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const data = [
    { imgtitle: 'kangaroo', image: 'kangaroo.jpg' },
    { imgtitle: 'monkey', image: 'monkey.jpg' },
    { imgtitle: 'owl', image: 'owl.jpg' }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('animal', {title: 'Animals', animals: data});
});

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}에서 대기중`);
});