var studentsController = require('../controllers/students');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');

module.exports = function(app, io) {

  app.get('/login', authenticationController.login);
  app.get('/signup', authenticationController.signup);
    
  app.post('/teachers/polls/', teachersController.pollClass.bind(null, io));

  app.get('/teachers/polls/:lessonId', teachersController.getPolls);  
  
  app.get('/teachers/lessons/:classId', teachersController.getLessons);

  app.post('/students/ready', studentsController.readyStage.bind(null, io));
};