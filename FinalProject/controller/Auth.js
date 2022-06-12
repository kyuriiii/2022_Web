
const { User, Point } = require('../models');
const cst = require('../config/const.js');
const bcrypt = require('bcrypt');

exports.joinView = (req,res, next) => {
  res.render("join");
}
exports.join = async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(cst.ERRORCODE_BAD_REQUEST).send({msg: "이미 존재하는 계정입니다."});
      return false;
    }

    const hash = await bcrypt.hash(password, 12);
    let user = await User.create({email, nickname, password: hash, sns_id: '', provider:'local'});
    await Point.create({user_id: user.user_id, point: 3000});
    
    return res.redirect('/auth');
  } catch (error) {
    console.log( error );
    return next(error);
  }
}
exports.login = (req,res) => {
    res.render("login");
}

exports.logout = (req, res) => {
    req.logout(() => {
      req.session.destroy();
      res.redirect('/');
    });
}