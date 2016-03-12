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

  getPolls: function(req, res, next) {
    // var lessonId = req.body.lessonId;
    // var allPolls = RequestedResponses.getPolls(lessonId);

  },

  thumbsCheck: function(req, res, next) {
    // var teacherId = req.body.teacherId;
    // var poll = req.body.poll;

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