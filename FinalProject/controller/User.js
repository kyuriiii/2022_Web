const { User, Pay, Lecture, Post, Point, sequelize } = require('../models');
const cst = require('../config/const.js');

exports.getUser = (req, res, next) => {
    if (req.user == null ) res.send( {} );
    else {
        User.findOne({where: {user_id: req.user.user_id}})
        .then((user) => res.send(user) )
        .catch((err) => { res.status(cst.ERRORCODE_BAD_REQUEST).send(cst.ERRORMSG_BAD_REQUEST)});
    }
}

exports.mypage = async (req, res, next) => {
    let pays = await Pay.findAll( {
        include: [{
            model: Post,
            attributes: ['post_id','title', 'content', 'point'],
            include: [{
                model: User,
                attributes: ['user_id', 'nickname', 'email'],
              },{
                model: Lecture,
                attributes: ['lecture_id','name', 'professor', 'class'],
              }]
          }],
        where: {user_id: req.user.user_id}
    });
    let writes = await Post.findAll({
        include: [{
          model: Lecture,
          attributes: ['lecture_id','name', 'professor', 'class'],
        }],
        where: {user_id: req.user.user_id},
        order: [['registered', 'DESC']]
    });
    let get = await Point.findAll({raw:true, attributes: [[sequelize.fn('SUM', sequelize.col("point")), 'total']], where: {user_id: req.user.user_id}});
    let used = await Pay.findAll({raw: true, attributes: [[sequelize.fn('SUM', sequelize.col("point")), 'total']], where: {user_id: req.user.user_id}});
    let total = ( get[0].total > 0 ? get[0].total : 0 ) -  ( used[0].total > 0 ? used[0].total : 0 );

    await res.render('mypage', {user: req.user, pays: pays, writes: writes, point: total})
}

exports.myinfo = (req, res, next) => {
    User.update( req.body, {where: {user_id: req.user.user_id}})
    .then((user) => {
        req.user = user;
        res.send( true );
    });
}