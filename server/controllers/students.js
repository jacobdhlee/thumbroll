//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
// var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');

module.exports = {
  readyStage: function(io, req, res, next) {
    // var studentId = req.body.studentId;
    // var poll = req.body.poll;
    io.on('connection', function(client){
      console.log('a student is ready to LERN!11!111!!');      
    });

    res.send('students ye be warned');

    //client.emit('thumbsCheck', 'a new thumbsCheck has been opened!');
  },

  respondToPoll: function(req, res, next) {
    // var studentId = req.body.studentId;
    // var lessonId = req.body.lessonId;

  },

};