const { Post, User, Lecture, Point, Pay, sequelize } = require('../models');
const fs = require('fs');
const cst = require('../config/const.js');
const { ERRORCODE_UNAUTHORIZED } = require('../config/const.js');

exports.getPosts = (req, res, next) => {
    Post.findAll({
        include: [{
          model: User,
          attributes: ['user_id', 'nickname', 'email'],
        },{
          model: Lecture,
          attributes: ['lecture_id','name', 'professor', 'class'],
        }],
        order: [['registered', 'DESC']]
    }).then((posts) => {console.log( posts ); res.render('main', {posts: posts})});
}

exports.createPost = async (req, res, next) => {
  let post = JSON.parse( JSON.stringify(req.body) );
  post["user_id"] = req.user.user_id;

  let newPost = await Post.create(post);
  await fs.rename( `public/post/${req.file.filename}`, `public/post/${newPost.post_id}.png`, (err) => {
    if ( err ) res.status(cst.ERRORCODE_BAD_REQUEST).send(cst.ERRORMSG_UNKNOWN);
  });
  
  res.redirect("/");
}

exports.buyPost = async (req, res, next) => {
  let post = await Post.findOne({where: {post_id: req.query.post_id}});

  if ( req.user.user_id == post.user_id ) {
    res.status(ERRORCODE_UNAUTHORIZED).send({msg: '작성자는 구매할 수 없습니다.'});
    return false;
  }

  let pay = await Pay.findOne({where: {user_id: req.user.user_id, post_id: post.post_id}});
  if (pay != null){
    res.status(ERRORCODE_UNAUTHORIZED).send({msg: '이미 구매한 족보입니다.'});
    return false;
  }


  let get = await Point.findAll({raw:true, attributes: [[sequelize.fn('SUM', sequelize.col("point")), 'total']], where: {user_id: req.user.user_id}});
  let used = await Pay.findAll({raw: true, attributes: [[sequelize.fn('SUM', sequelize.col("point")), 'total']], where: {user_id: req.user.user_id}});
  let total = ( get[0].total > 0 ? get[0].total : 0 ) -  ( used[0].total > 0 ? used[0].total : 0 );

  if ( post.point > total ) {
    res.status(ERRORCODE_UNAUTHORIZED).send({msg: '포인트가 부족합니다.'});
    return false;
  }

  let newPay = {
    point: post.point,
    user_id: req.user.user_id,
    post_id: post.post_id
  };
  await Pay.create(newPay);
  await res.send(true);
}