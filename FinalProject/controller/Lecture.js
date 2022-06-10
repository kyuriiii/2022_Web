const { Lecture } = require('../models');

exports.getLectures = async (req, res, next) => {
  let allLectures = await Lecture.findAll().catch((err) => { res.status(cst.ERRORCODE_BAD_REQUEST).send(cst.ERRORMSG_BAD_REQUEST)});
  let offset = 10 * ( req.query.page - 1 );

  await Lecture.findAll({ 
    offset: offset,
    limit: 10,
    order: [['id','ASC']]
  })
  .then((lectures) => {console.log( lectures ); res.render('lecture', {lectures: lectures, page: parseInt( allLectures.length/10 ) + 1});});
}