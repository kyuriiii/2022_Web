const express = require('express');
const Post = require('../models/post');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();


// 포스트 생성
router
.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    console.log('Post:', post.content, post.UserId);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
})
// 포스트 수정
.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.update({
      where: {id: req.path.id},
      content : req.body.content,
    });
    console.log('Post : ' , post.constent, post.UserId);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
})
// 포스트 삭제
.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {id: req.path.id}
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
