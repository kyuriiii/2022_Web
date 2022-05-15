// routes/upload.js
// 파일 업로드를 처리하는 라우터

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'img/');
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        console.log( "session - : ", req.session.user_ID);
        if ( !ext.includes( "png" ) ) 
            return cb(new Error( 'png 확장자만 업로드 가능합니다.') );
        cb(null, req.session.user_ID + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5*1024*1024 }
});

router.get('/', (req,res) => {
    res.render('upload');
});

router.post('/', upload.single( 'image'), (req, res) => {
    console.log('Uploaded Single!');
    res.redirect('/');
});

router.post('/', upload.none(), (req, res) => {
    console.log('Uploaded Nodne!');
    res.redirect('/');
});

module.exports = router;