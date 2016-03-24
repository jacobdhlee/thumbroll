var studentsController = require('../controllers/students');
var teachersController = require('../controllers/teachers');
var authenticationController = require('../controllers/authenticate');
var path = require('path');

module.exports = function(app, io) {

  app.post('/login', authenticationController.login);
  app.post('/signup', authenticationController.signup);
    
  app.post('/teachers/polls/', teachersController.pollClass.bind(null, io));

  app.get('/teachers/polls/:lessonId', teachersController.getLessonPolls);  
  
  app.get('/teachers/lessons/:classId', teachersController.getClassLessons);
  app.post('/teachers/lessons', teachersController.addClassLesson);

  app.post('/students/ready', studentsController.readyStage.bind(null, io));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/desktop/dist', 'index.html'));
  })
};