const { User } = require('../models');
const cst = require('../config/const.js');

exports.getUser = (req, res, next) => {
    if (req.user == null ) res.send( {} );
    else {
        User.findOne({where: {user_id: req.user.user_id}})
        .then((user) => res.send(user) )
        .catch((err) => { res.status(cst.ERRORCODE_BAD_REQUEST).send(cst.ERRORMSG_BAD_REQUEST)});
    }
}