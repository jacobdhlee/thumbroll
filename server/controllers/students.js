//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
// var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');

module.exports = {

  readyStage : function(io, req, res, next) {

    //var studentInformation = req.body.studentData
    var pollResponse = {
      responseId: 1,
      type: 'thumbs',
      datetime: new Date(),
      lessonId: 13,
    };

    io.on('connection', function(student){
      
      student.emit('studentStandby', studentInformation);

      student.on('newPoll', function(data) {
        student.emit(data);
      });

      setTimeout(function(){
        io.sockets.emit('responseFromStudent', pollResponse);
      }, 5000);

    });
    res.status(200).send('Hello from the student side');
  }
};