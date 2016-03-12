// var classesController = require('../controllers/classes');
// var classLessonController = require('../controllers/class_lessons');
// var lessonsController = require('../controllers/lessons');
// var receivedResponsesController = require('../controllers/received_responses');
// var requestedResponsesController = require('../controllers/requested_responses');
var studentsController = require('../controllers/students');
// var studentsClassesController = require('../controllers/students_classes');
// var teacherClassesController = require('../controllers/teacher_classes');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');

module.exports = function(app, express, io) {

  app.get('/login', authenticationController.login);
  app.get('/signup', authenticationController.signup);
  
  app.get('/teachers/poll', teachersController.pollClass);
  app.get('/teachers/thumbs', teachersController.thumbsCheck.bind(this, io));
  
  app.post('/teachers/thumbs', teachersController.thumbsCheck);
  app.post('/teachers/poll', teachersController.pollClass);

  //app.get('/teachers', teachersController.getAllClasses);

  //app.get('/teachers/:classId', teachersController.getOneClass);

  //app.get('/students', studentsController.readyStage);

  //app.get('/classDismissed', teachersController.endClass);



};