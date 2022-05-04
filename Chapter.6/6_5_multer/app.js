const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// 추가
// dest: 업로드 파일들이 지정될 경로를 지정
const upload = multer({ dest: 'temp/' });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/upload.html'));
});

// 추가
// 한 개의 파일 업로드시 upload.single() 미들웨어 실행
router.post('/', upload.single( 'image'), (req, res) => {
    console.log( req.file, req.body );
    res.send('Uploaded!');
});

module.exports = router;