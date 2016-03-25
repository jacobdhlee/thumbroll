var studentsController = require('../controllers/students');
var teachersController = require('../controllers/teachers');
var classesController = require('../controllers/classes');
var authenticationController = require('../controllers/authenticate');
var rootController = require('../controllers/root');
var utils = require('../utils/utils');

module.exports = function(app, io) {

  app.post('/login', authenticationController.login);
  app.post('/signup', authenticationController.signup);
  app.get('/logout', authenticationController.logout);

  app.get('/checkAuth', authenticationController.checkAuth);
    
  app.post('/teachers/polls/', utils.checkUser, teachersController.pollClass.bind(null, io));

  app.get('/teachers/polls/:lessonId', utils.checkUser, teachersController.getLessonPolls);  
  
  app.get('/teachers/classes/:classId/lessons', utils.checkUser, teachersController.getClassLessons);

  app.get('/teachers/classes/:teacherId', teachersController.getClasses);
  app.get('/students/classes/:studentId', studentsController.getClasses);
  app.get('/classes/lessons/:classId', classesController.getLessons);

  app.post('/teachers/lessons', teachersController.addClassLesson);

  app.post('/students/ready', utils.checkUser, studentsController.readyStage.bind(null, io));
  // app.get(utils.checkUser, '/', rootController.root);
  app.post('/teachers/classes', teachersController.addClasses);
  app.post('/teachers/class/student', teachersController.addStudentToClass);
};