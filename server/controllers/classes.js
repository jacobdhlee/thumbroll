var models = require("./../models");
var sequelize = require('./../models/index').sequelize;

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

  getClassData: function(req, res, next) {
    var classId = req.params.classId;
    // var responseObj = {};
    // sequelize.query('SELECT id, name FROM classes WHERE id = ' + classId)
    // .then(function(data) {
    //   responseObj.class = data[0][0];
    //   sequelize.query('SELECT id, name FROM lessons WHERE class_id = ' + responseObj.class.id)
    //   .then(function(data) {
    //     console.log('$$$$',data)
    //     responseObj.lessons = data[0];
    //   });
    // });

    sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
      + 'b.id AS poll_id, b.name AS poll_name, b.type AS poll_type, b.answer AS poll_answer, ' 
      + 'COUNT(c.*) AS response_count ' 
      + 'FROM lessons a '
      + 'LEFT JOIN polls b ON b.lesson_id = a.id '
      + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
      + 'JOIN students d ON d.id = c.poll_id '
      + 'WHERE a.class_id = ' + classId + ' '
      + 'GROUP BY a.id, a.name, b.id, b.name, b.answer ')
    .then(function(data) {
      console.log('*****', data[0]);
    });

    sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
      + 'b.id AS poll_id, b.name AS poll_name, b.type AS poll_type, ' 
      + 'COUNT(c.*) AS correct_response_count ' 
      + 'FROM lessons a '
      + 'LEFT JOIN polls b ON b.lesson_id = a.id '
      + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
      + 'JOIN students d ON d.id = c.poll_id '
      + 'WHERE a.class_id = ' + classId + ' '
      + 'AND b.answer IS NOT NULL '
      + 'AND c.response_val = b.answer '
      + 'GROUP BY a.id, a.name, b.id, b.name, b.type, b.answer ')
    .then(function(data) {
      console.log('&&&&&', data[0]);
    });

    sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
      + 'b.id AS poll_id, b.name AS poll_name, b.type AS poll_type, ' 
      + 'AVG(CAST(c.response_val AS decimal)) AS average_thumb ' 
      + 'FROM lessons a '
      + 'LEFT JOIN polls b ON b.lesson_id = a.id '
      + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
      + 'JOIN students d ON d.id = c.poll_id '
      + 'WHERE a.class_id = ' + classId + ' '
      + "AND b.type = 'thumbs' " 
      + 'GROUP BY a.id, a.name, b.id, b.name, b.type, b.answer ')
    .then(function(data) {
      console.log('()()()()', data[0]);
    });

    sequelize.query('SELECT a.id AS class_id, a.name AS class_name, '
      + 'b.id AS lesson_id, b.name AS lesson_name, '
      + 'c.id AS poll_id, c.name AS poll_name, c.type AS poll_type, '
      + 'e.id AS student_id, e.firstname AS first_name, e.lastname AS last_name, '
      + 'd.response_val AS answer '
      + 'FROM classes a '
      + 'JOIN lessons b ON a.id = b.class_id '
      + 'LEFT JOIN polls c ON b.id = c.lesson_id '
      + 'LEFT JOIN poll_responses d ON c.id = d.poll_id '
      + 'JOIN students e ON d.student_id = e.id '
      + 'WHERE a.id = ' + classId)
    .then(function(data) {
      console.log('^^^^', data[0]);
      res.status(200).send(data[0]);
    });
  },


}

