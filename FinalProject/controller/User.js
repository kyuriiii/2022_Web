const { User } = require('../models');
const cst = require('../config/const.js');

exports.getUser = (req, res, next) => {
    if (req.user == null ) res.send( {} );
    else {
        User.findOne({where: {id: req.user.id}})
        .then((user) => res.send(user) )
        .catch((err) => { res.status(cst.ERRORCODE_BAD_REQUEST).send(cst.ERRORMSG_BAD_REQUEST)});
    }
}