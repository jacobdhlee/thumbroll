//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
//var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');


module.exports = {
  getClasses: function(req, res, next) {
    var teacherId = req.body.teacherId;

    //TODO: get all classes through TeacherClasses
    //TeacherClasses.getAllClasses(teacherId);
  },

  getLessons: function(req, res, next) {
    //get all lessons based on req.body.classId
    var classId = req.params.classId;

    ClassLessons.hasMany(Lessons, {foreignKey: 'lessonId'})
    Lessons.belongsTo(ClassLessons, {foreignKey: 'lessonId'})

    var allLessons = Lessons.find({ where: {
      classId: classId,
    }, include: [ClassLessons]});

    return allLessons;
  },

  getPolls: function(req, res, next) {
    var lessonId = req.params.lessonId;
    // TODO: Query DB to list all the polls based on one single lesson ID
  },

  newPoll: function(req, res, next) {
    // TODO: post new poll to the db with the following object sent over: {lessonId, poll type}
    // then, after successfully posted to the DB, open up a socket event with a DB-generated
    // responseId and the poll type for students to send info back.
  },

  pollClass: function(io, req, res, next) {
    var lessonId = req.body.lessonId;
    var pollObject = req.body.pollObject;

    io.sockets.emit('newPoll', pollObject);
    
    res.status(201).send('Poll sent... ' + pollObject);
  },

};