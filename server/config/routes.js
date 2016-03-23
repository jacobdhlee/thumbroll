var studentsController = require('../controllers/students');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');
var utils = require('../utils/utils');

module.exports = function(app, io) {

  app.post('/login', authenticationController.login);
  app.post('/signup', authenticationController.signup);
  app.get('/logout', authenticationController.logout);
    
  app.post(utils.checkUser, '/teachers/polls/', teachersController.pollClass.bind(null, io));

  app.get(utils.checkUser, '/teachers/polls/:lessonId', teachersController.getLessonPolls);  
  
  app.get(utils.checkUser, '/teachers/lessons/:classId', teachersController.getClassLessons);
  app.post(utils.checkUser, '/teachers/lessons', teachersController.addClassLesson);

  app.post(utils.checkUser, '/students/ready', studentsController.readyStage.bind(null, io));
};