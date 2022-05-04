const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// 수정
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'temp/');
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5*1024*1024 }
 });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/upload.html'));
});

// 추가
// 한 개의 파일 업로드시 upload.single() 미들웨어 실행
router.post('/', upload.single( 'image'), (req, res) => {
    console.log( req.file, req.body );
    res.send('Uploaded Single!');
});

router.post('/', upload.array( 'images'), (req, res) => {
    console.log( req.file, req.body );
    res.send('Uploaded Array!');
});

router.post('/', upload.fields[{ name: 'image1'}, {name: 'image2' }], (req, res) => {
    console.log( req.file, req.body );
    res.send('Uploaded Fields!');
});

router.post('/', upload.none(), (req, res) => {
    console.log( req.body );
    res.send('Uploaded Nodne!');
});


module.exports = router;