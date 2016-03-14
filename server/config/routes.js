var studentsController = require('../controllers/students');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');

module.exports = function(app, io) {

  app.get('/login', authenticationController.login);
  app.get('/signup', authenticationController.signup);
    
  app.get('/teachers/thumbs', teachersController.thumbsCheck);

  app.get('/teachers/lessons/:classId', teachersController.getLessons);
  app.get('/teachers/polls/:lessonId', teachersController.getPolls);

  app.post('/teachers/polls', teachersController.newPoll);
  

  app.get('/students/ready', studentsController.readyStage.bind(null, io));
};