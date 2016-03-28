var models = require("./../models");
var sequelize = require('./../models/index').sequelize;

module.exports = {
  getClasses: function(req, res, next) {
    var teacherId = req.params.teacherId;
    models.classes.findAll({ where: {
        teacher_id: teacherId
      }
    })
    .then(function(classes){
      res.status(200).send(classes);
    })
    .catch(function(err){
      console.error('Error getting class from DB', err);
      res.status(500).send(err);
    })
    //TODO: get all classes through TeacherClasses
    //currently being handled by authentication controller, but probably should be here
  },

  getTodaysLessons: function(req, res, next) {
    var teacherId = req.params.teacherId;
    sequelize.query(
      'SELECT * FROM classes a '
      + 'JOIN lessons b ON a.id = b.class_id '
      + 'WHERE a.teacher_id = ' + teacherId + ' '
      + "AND b.date BETWEEN DATE 'today' AND DATE 'tomorrow' "
    ).then(function(data) {
      var results = data[0];
      console.log(results);
      res.status(200).send(results);
    }).catch(function(err) {
      console.error('Error with query', err)
      res.status(500).send(err);
    });
  },

  getClassLessons: function(req, res, next) {
    var classId = req.params.classId;
    models.lessons.findAll({ where: {
      class_id: classId
      }
    })
    .then(function(lessons) {
      res.status(200).send(lessons);
    })
    .catch(function(err) {
      console.error('Error getting class lessons from DB:', err);
      res.status(500).send(err);
    });
  },

  addClassLesson: function(req, res, next) {
    var classId = req.body.classId;
    var date = req.body.lessonDate || new Date();
    var name = req.body.lessonName;
    models.lessons.create({
      name: name,
      date: date,
      class_id: classId
    })
    .then(function(data) {
      var body = data.dataValues;
      res.status(200).send(body);
    })
    .catch(function(err) {
      console.error('Error saving lesson to DB:', err);
      res.status(500).send(err);
    });
  },

  getLessonPolls: function(req, res, next) {
    var lessonId = req.params.lessonId;
    models.polls.findAll({ where: {
      lesson_id: lessonId,
      //TODO?: preset: true
      }
    })
    .then(function(polls) {
      res.status(200).send(polls);
    })
    .catch(function(err) {
      console.error('Error getting class lessons from DB:', err);
      res.status(500).send(err);
    });
  },

  pollClass: function(io, req, res, next) {
    var lessonId = req.body.lessonId;
    var classId = req.body.classId;
    var name = req.body.name;
    var pollObject = req.body.pollObject;
    
    // quick class polls are not saved
    if(lessonId === 'Quick Class') {
      console.log('Incoming quick class poll for class', classId);
      var pollInformation = {
        lessonId: lessonId,
        pollObject: pollObject,
        pollId: 'Quick Poll'
      };
      io.sockets.to('room' + classId).emit('newPoll', pollInformation);
      res.status(201).send(pollInformation);
    } 

    //TODO: query if preset. otherwise:
    var type = '';
    //TODO: should have backend/frontend consistency in how we identify different types
    if(pollObject.id == 1) {
      type = 'thumbs';
    } else if(pollObject.id == 2) {
      type = 'multiChoice';
    }

    if(lessonId !== 'Quick Class') {
      console.log('Incoming poll for class', classId);
      models.polls.create({
        type: type,
        name: name,
        lesson_id: lessonId,
        sent: true
      })
      .then(function(data) {
        var pollInformation = {
          lessonId: lessonId,
          pollObject: pollObject,
          pollId: data.dataValues.id
        }
        io.sockets.to('room' + classId).emit('newPoll', pollInformation);
        res.status(201).send(pollInformation);
      })
      .catch(function(err) {
        console.error('Error saving poll to DB:', err);
        res.status(500).send(err);
      });
    }
  },

  addClasses: function(req, res, next) {
    var teacherId = req.body.teacherId;
    var name = req.body.name;
    models.classes.create({
      name: name,
      teacher_id: teacherId,
    })
    .then(function(data) {
      var body = {classId: data.dataValues.id};
      res.status(200).send(body);
    })
    .catch(function(err) {
      console.error('Error saving class to DB:', err);
      res.status(500).send(err);
    });
  },

  addStudentToClass: function(req, res, next) {
    var studentEmail = req.body.studentEmail;
    var classId = req.body.classId;
    // find relevant student based on email address
    models.students.findOne({where: {
        email: studentEmail
      }
    }).then(function(student){

      if (!student) {
        res.status(400).send();
      } else {
       // Write student ID to students_classes
       models.students_classes.findOrCreate({ where: {
          student_id: student.dataValues.id,
          class_id: classId
        }
       })
       .spread(function(student, created){
        console.log("student: " + student, "created: " + created);
         var body = {
           student: student,
           created: created
         };
         
         // Return student object in the format we need
         res.status(200).send(body);
       })
       .catch(function(err){
         console.error('Error saving class to DB:', err);
         res.status(500).send(err);
       }); 
     }
    })
    .catch(function(err){
      console.error('Error saving class to DB:', err);
      res.status(500).send(err);
    });
  }
};