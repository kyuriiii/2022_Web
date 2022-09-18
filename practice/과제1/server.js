const http = require('http');
const fs = require('fs').promises;

// 찜 목록을 저장해놓는 데이터 공간
const hearts = {};

http.createServer(async (req, res) => {
    try {
        if ( req.method == "GET" ) {
            if ( req.url == "/" ) {
                // 기본 경로로 찜을 할 수 있는 상품 목록이 있는 페이지를 보여준다.
                const data = await fs.readFile('./main.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if ( req.url == "/about" ) {
                // About Me라고 적혀 있는 페이지를 보여준다.
                const data = await fs.readFile('./about.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if ( req.url == "/heartList" ) {
                // 사용자가 찜한 목록을 보여주는 페이지를 보여준다.
                const data = await fs.readFile('./heart.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if ( req.url == "/heart" ) {
                // 사용자가 찜한 목록을 가져온다.
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(JSON.stringify(hearts));
            }
            // 접속 주소가 잘못되었을 경우 해당 url의 파일을 찾은 후 없으면 파일을 찾을 수 없다는 err을 반환한다.
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
              } catch (err) { console.error( err ); }
        } else if ( req.method == "POST" ) {
            if ( req.url == "/heart") {
                // post 시 body는 { "product": 제품명, "number": 개수 } 로 넘어온다.
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });

                return req.on('end', () => {
                    console.log( 'POST 본문(Body): ', body );
                    const { product, number } = JSON.parse( body );
                    
                    // 이때 배열의 key는 제품명이 되고, 값은 number가 된다. 
                    // 기존에 해당 product를 이미 찜을 했다면 기존에 찜한 개수에 body로 넘어온 개수만큼 추가한다.
                    if ( hearts[product] != null ) hearts[product] = parseInt( number ) + parseInt( hearts[product] );
                    else hearts[product] = number;

                    res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8'} );
                    return res.end('ok');
                });
            }
        } else if ( req.method == "PUT" ) {
            if ( req.url.startsWith('/heart/') ) {
                const product = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', (data) => {
                    console.log('PUT 본문(Body): ', body);
                    hearts[product] = JSON.parse(body).number;

                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'} );
                    return res.end('ok');
                });
            }
        } else if ( req.method == "DELETE" ) {
            if ( req.url.startsWith('/heart/')) {
                const product = req.url.split('/')[2];
                delete hearts[product];
                
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'} );
                return res.end('ok');
            }
        }

        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
}).listen( 8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다');
});