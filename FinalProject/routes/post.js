const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const controller = require('../controller/Post');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
      cb(null, 'public/post/');
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
      if ( !ext.includes( "png" ) ) 
          return cb(new Error( 'png 확장자만 업로드 가능합니다.') );
      cb(null, "test" + ext);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5*1024*1024 }
});

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", controller.getPosts);
router.post("/one", isLoggedIn, upload.single('postfile'), controller.createPost);
router.get("/buy", isLoggedIn, controller.buyPost);
router.get("/post", controller.getPost);
router.delete("/post", isLoggedIn, controller.deletePost);

module.exports = router;