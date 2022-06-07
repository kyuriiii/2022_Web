const User = require('../models/user');

exports.login = (req,res) => {
    res.render("login");
}

exports.logout = (req, res) => {
    req.logout(() => {
      req.session.destroy();
      res.redirect('/');
    });
}