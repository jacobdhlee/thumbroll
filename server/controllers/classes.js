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

    sequelize.query(
      'SELECT w.lesson_id, w.lesson_name, w.poll_count, ' 
      + 'x.response_count, y.correct_response_count, z.average_thumb, v.student_count FROM '
        + '(SELECT a.id AS lesson_id, a.name AS lesson_name, '
        + 'COUNT(b.*) AS poll_count ' 
        + 'FROM lessons a '
        + 'LEFT JOIN polls b ON b.lesson_id = a.id '
        + 'WHERE a.class_id = ' + classId + ' '
        + 'GROUP BY a.id, a.name) w '
      + 'LEFT JOIN '
        + '(SELECT a.id AS lesson_id, '
        + 'COUNT(c.*) AS response_count ' 
        + 'FROM lessons a '
        + 'LEFT JOIN polls b ON b.lesson_id = a.id '
        + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
        + 'WHERE a.class_id = ' + classId + ' '
        + 'GROUP BY a.id) x '
      + 'ON w.lesson_id = x.lesson_id LEFT JOIN '
        + '(SELECT a.id AS lesson_id, '
        + 'COUNT(c.*) AS correct_response_count ' 
        + 'FROM lessons a '
        + 'LEFT JOIN polls b ON b.lesson_id = a.id '
        + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
        + 'WHERE a.class_id = ' + classId + ' '
        + 'AND b.answer IS NOT NULL '
        + 'AND c.response_val = b.answer '
        + 'GROUP BY a.id) y '
      + 'ON w.lesson_id = y.lesson_id LEFT JOIN '
        + '(SELECT a.id AS lesson_id, '
        + 'AVG(CAST(c.response_val AS decimal)) AS average_thumb ' 
        + 'FROM lessons a '
        + 'LEFT JOIN polls b ON b.lesson_id = a.id '
        + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
        + 'WHERE a.class_id = ' + classId + ' '
        + "AND b.type = 'thumbs' " 
        + 'GROUP BY a.id) z '
      + 'ON w.lesson_id = z.lesson_id LEFT JOIN '
        + '(SELECT a.id AS lesson_id, '
        + 'COUNT(distinct c.student_id) AS student_count ' 
        + 'FROM lessons a '
        + 'LEFT JOIN polls b ON b.lesson_id = a.id '
        + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
        + 'WHERE a.class_id = ' + classId + ' '
        + 'GROUP BY a.id) v '
      + 'ON w.lesson_id = v.lesson_id'
    ).then(function(data) {
      var results = data[0];
      console.log(results);
      res.status(200).send(results);
    })

    // sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
    //   + 'COUNT(b.*) AS poll_count ' 
    //   + 'FROM lessons a '
    //   + 'LEFT JOIN polls b ON b.lesson_id = a.id '
    //   + 'WHERE a.class_id = ' + classId + ' '
    //   + 'GROUP BY a.id, a.name')
    //   .then(function(data) {
    //   console.log('Poll Counts Per Lesson:', data[0]);
    //   results.lessons = data[0];
    //   sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
    //     + 'b.id AS poll_id, b.name AS poll_name, b.type AS poll_type, b.answer AS poll_answer, ' 
    //     + 'COUNT(c.*) AS response_count ' 
    //     + 'FROM lessons a '
    //     + 'LEFT JOIN polls b ON b.lesson_id = a.id '
    //     + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
    //     + 'JOIN students d ON d.id = c.poll_id '
    //     + 'WHERE a.class_id = ' + classId + ' '
    //     + 'GROUP BY a.id, a.name, b.id, b.name, b.answer ')
    //   .then(function(data) {
    //     console.log('Response Counts Per Poll:', data[0]);
    //     results.polls = data[0];

    //     sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
    //       + 'b.id AS poll_id, b.name AS poll_name, b.type AS poll_type, ' 
    //       + 'COUNT(c.*) AS correct_response_count ' 
    //       + 'FROM lessons a '
    //       + 'LEFT JOIN polls b ON b.lesson_id = a.id '
    //       + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
    //       + 'JOIN students d ON d.id = c.poll_id '
    //       + 'WHERE a.class_id = ' + classId + ' '
    //       + 'AND b.answer IS NOT NULL '
    //       + 'AND c.response_val = b.answer '
    //       + 'GROUP BY a.id, a.name, b.id, b.name, b.type, b.answer ')
    //     .then(function(data) {
    //       console.log('Correct Answer Counts Per Poll:', data[0]);
    //       results.correctCounts = data[0];

    //       sequelize.query('SELECT a.id AS lesson_id, a.name AS lesson_name, '
    //         + 'b.id AS poll_id, b.name AS poll_name, b.type AS poll_type, ' 
    //         + 'AVG(CAST(c.response_val AS decimal)) AS average_thumb ' 
    //         + 'FROM lessons a '
    //         + 'LEFT JOIN polls b ON b.lesson_id = a.id '
    //         + 'LEFT JOIN poll_responses c ON c.poll_id = b.id '
    //         + 'JOIN students d ON d.id = c.poll_id '
    //         + 'WHERE a.class_id = ' + classId + ' '
    //         + "AND b.type = 'thumbs' " 
    //         + 'GROUP BY a.id, a.name, b.id, b.name, b.type, b.answer ')
    //       .then(function(data) {
    //         console.log('Average Thumb Responses Per Poll:', data[0]);
    //         results.thumbAverages = data[0];

    //         sequelize.query('SELECT a.id AS class_id, a.name AS class_name, '
    //           + 'b.id AS lesson_id, b.name AS lesson_name, '
    //           + 'c.id AS poll_id, c.name AS poll_name, c.type AS poll_type, '
    //           + 'e.id AS student_id, e.firstname AS first_name, e.lastname AS last_name, '
    //           + 'd.response_val AS answer '
    //           + 'FROM classes a '
    //           + 'JOIN lessons b ON a.id = b.class_id '
    //           + 'LEFT JOIN polls c ON b.id = c.lesson_id '
    //           + 'LEFT JOIN poll_responses d ON c.id = d.poll_id '
    //           + 'JOIN students e ON d.student_id = e.id '
    //           + 'WHERE a.id = ' + classId)
    //         .then(function(data) {
    //           console.log('Complete Class/Lesson/Poll/Response/Student Data:', data[0]);
    //           results.allData = data[0]

    //           res.status(200).send(results);
    //         });
    //       });
    //     });
    //   });
    // });

  },

  getLessonData: function(req, res, next) {
    var lessonId = req.params.lessonId;
    sequelize.query(
      'SELECT w.poll_id, w.poll_name, w.answer, w.response_count, ' 
      + 'x.student_count, y.correct_response_count, z.average_thumb FROM '
        + '(SELECT a.id AS poll_id, a.name AS poll_name, a.answer, '
        + 'COUNT(b.*) AS response_count ' 
        + 'FROM polls a '
        + 'LEFT JOIN poll_responses b ON b.poll_id = a.id '
        + 'WHERE a.lesson_id = ' + lessonId + ' '
        + 'GROUP BY a.id) w '
      + 'LEFT JOIN '
        + '(SELECT a.id AS poll_id, '
        + 'COUNT(distinct c.id) AS student_count ' 
        + 'FROM polls a '
        + 'LEFT JOIN poll_responses b ON b.poll_id = a.id '
        + 'JOIN students c ON c.id = b.student_id '
        + 'WHERE a.lesson_id = ' + lessonId + ' '
        + 'GROUP BY a.id) x '
      + 'ON w.poll_id = x.poll_id LEFT JOIN '
        + '(SELECT a.id AS poll_id, '
        + 'COUNT(b.*) AS correct_response_count ' 
        + 'FROM polls a '
        + 'LEFT JOIN poll_responses b ON b.poll_id = a.id '
        + 'WHERE a.lesson_id = ' + lessonId + ' '
        + 'AND a.answer IS NOT NULL '
        + 'AND b.response_val = a.answer '
        + 'GROUP BY a.id) y '
      + 'ON w.poll_id = y.poll_id LEFT JOIN '
        + '(SELECT a.id AS poll_id, '
        + 'AVG(CAST(b.response_val AS decimal)) AS average_thumb ' 
        + 'FROM polls a '
        + 'LEFT JOIN poll_responses b ON b.poll_id = a.id '
        + 'WHERE a.lesson_id = ' + lessonId + ' '
        + "AND a.type = 'thumbs' " 
        + 'GROUP BY a.id) z '
      + 'ON w.poll_id = z.poll_id '
    ).then(function(data) {
      var results = data[0];
      console.log(results);
      res.status(200).send(results);
    })
  }

}

