//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
// var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');

module.exports = {
  getClasses: function(req, res, next) {
    var teacherId = req.body.teacherId;
    //get all classes through TeacherClasses
    //TeacherClasses.getAllClasses(teacherId);
  },

  getLessons: function(req, res, next) {
    //get all lessons based on req.body.classId
  },

  getPolls: function(req, res, next) {
    // var lessonId = req.body.lessonId;
    // var allPolls = RequestedResponses.getPolls(lessonId);

  },

  newPoll: function(req, res, next) {
    // post new poll to the db with the following object sent over: {lessonId, poll type}
    // then, after successfully posted to the DB, open up a socket event with a DB-generated
    // responseId and the poll type for students to send info back.
  },

  thumbsCheck: function(io, req, res, next) {
    // var teacherId = req.body.teacherId;
    // var poll = req.body.poll;
    io.on('connection', function(client){
      //client.emit('join');
      console.log('a teacher connected111!!11!1!!!');
      setTimeout(function(){
        io.sockets.emit('thumbsCheck', 'a new thumbsCheck has been opened!');
      }, 5000);
    });

    // this fake poll would normally be sent by the client to the socket, to the students' clients
    var poll = {
      responseId: 1,
      type: 'thumbs',
      datetime: new Date(),
      lessonId: 13,
    };
    res.json(poll);
  },

  pollClass: function(req, res, next) {
    // var teacherId = req.body.teacherId;
    // var lessonId = req.body.lessonId;

    // var poll = RequestedResponses.findPoll(lessonId);

    var poll = {
      type: 'poll',
      datetime: new Date(),
      lessonId: 4,
      responseId: 2
    };
    res.json(poll);
  },

};