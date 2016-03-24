var studentsController = require('../controllers/students');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');
var rootController = require('../controllers/root');
var utils = require('../utils/utils');

module.exports = function(app, io) {

  app.post('/login', authenticationController.login);
  app.post('/signup', authenticationController.signup);
  app.get('/logout', authenticationController.logout);
    
  app.post('/teachers/polls/', utils.checkUser, teachersController.pollClass.bind(null, io));

  app.get('/teachers/polls/:lessonId', utils.checkUser, teachersController.getLessonPolls);  
  
  app.get('/teachers/lessons/:classId', utils.checkUser, teachersController.getClassLessons);
  app.post('/teachers/lessons', utils.checkUser, teachersController.addClassLesson);

  app.post('/students/ready', utils.checkUser, studentsController.readyStage.bind(null, io));
  // app.get(utils.checkUser, '/', rootController.root);
};