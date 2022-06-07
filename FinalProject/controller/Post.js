const { Post, User } = require('../models');

exports.getPosts = (req, res, next) => {
    Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'nickname', 'email'],
        },
        order: [['registered', 'DESC']]
    }).then((posts) => res.render('main', {posts: posts}));
}