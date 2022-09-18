const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, UserInfo } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// 유저 프로필 생성
router.post('/profile', isLoggedIn, (req, res, next) => {
    try {
        const userInfo = await UserInfo.create({
            age : req.body.age,
            gender : req.body.gender,
            address : req.body.address,
            UserId : req.user.id,
        });
        console.log('UserInfo: ', userInfo.age, userInfo.gender, userInfo.address, userInfo.UserId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 유저 프로필 수정
router.put('/profile/:id', isLoggedIn, (req, res, next) => {
    try {
        const userInfo = await UserInfo.update({
            where : {id : req.path.id},
            age : req.body.age,
            gender: req.body.gender,
            address: req.body.addres,
        });
        console.log('UserInfo: ', userInfo.age, userInfo.gender, userInfo.address, userInfo.UserId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
