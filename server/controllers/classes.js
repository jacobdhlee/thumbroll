var models = require("./../models");

module.exports = {
  getLessons: function(req, res, next) {
    var classId = req.params.classId;
    models.lessons.findAll({ where: {
        class_id: classId
      }
    })
    .then(function(lessons){
      res.status(200).send(lessons);
    })
    .catch(function(err){
      console.error('Error getting lessons from DB', err);
      res.status(500).send(err);
    })
  },
}
