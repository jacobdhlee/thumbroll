var models = require("./../models");

module.exports = {
  getLessons: function(req, res, next) {
    var classId = req.params.classId;
    console.log(classId);
    models.lessons.findAll({ where: {
        class_id: classId
      }
    })
    .then(function(lessons){
      models.classes.findOne({ where: {
          id: classId
        } 
      }).then(function(oneClass){
        var response = {
          className: oneClass.dataValues.name,
          lessons: lessons,
        };
        res.status(200).send(response);
      })
    })
    .catch(function(err){
      console.error('Error getting lessons from DB', err);
      res.status(500).send(err);
    })
  },
}

