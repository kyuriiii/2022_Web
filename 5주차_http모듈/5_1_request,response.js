const http = require('http');

const hostname='127.0.0.1';
const port = 8080;

const server = http.createServer((req,res) => {
    console.log('클라이언트 요청 중...');
    console.log(req.method);
    console.log(req.url);
    // console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello, World!</h1>');
    res.end('<p>Hello Server!</p>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

server.on('connection', ()=>{
    console.log('클라이언트가 서버에 연결합니다.');
});

server.on('error', (error) => {
    console.error( error );
});