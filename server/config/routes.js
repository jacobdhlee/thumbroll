var classesController = require('../controllers/classes');
var classLessonController = require('../controllers/class_lessons');
var lessonsController = require('../controllers/lessons');
var receivedResponsesController = require('../controllers/received_responses');
var requestedResponsesController = require('../controllers/requested_responses');
var studentsController = require('../controllers/students');
var studentsClassesController = require('../controllers/students_classes');
var teacherClassesController = require('../controllers/teacher_classes');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');

module.exports = function(app) {

  app.get('/login', authenticationController.login);

  app.get('/signup', authenticationController.signup);

  app.get('/teachers', teachersController.getClasses);

  //app.get('/teachers/:classId', teachersController.getOneClass);

  app.get('/students', studentsController.readyStage);

  app.get('/teachers/poll', );

  app.get('/teachers/thumbs', );

};