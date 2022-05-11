// routes/upload.js
// 파일 업로드를 처리하는 라우터

const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'profile/');
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

router.get('/', (req,res) => {
    res.render('upload');
});

router.post('/', upload.single( 'image'), (req, res) => {
    console.log('Uploaded Single!');
    res.redirect('/profile');
});

router.post('/', upload.none(), (req, res) => {
    console.log('Uploaded Nodne!');
    res.redirect('/profile');
});

module.exports = router;