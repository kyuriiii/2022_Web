const express = require('express');

const Post = require('../models/post');
const { isLoggedIn } = require('./middleware');

const router = expres.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        console.log('Post: ', post.content, post.UserId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;