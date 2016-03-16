//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
//var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');
var models = require("./../models");


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
    //TODO: query if preset. otherwise:
    var type = '';
    //TODO: should have backend/frontend consistency in how we identify different types
    if(pollObject.id == 1) {
      type = 'thumbs';
    } else if(pollObject.id == 2) {
      type = 'multiChoice';
    }

    models.polls.create({
      type: type,
      lesson_id: lessonId
    })
    .then(function(data) {
      var pollInformation = {
        lessonId: lessonId,
        pollObject: pollObject,
        pollId: data.dataValues.id
      }
      io.sockets.emit('newPoll', pollInformation);
      res.status(201).send('Poll sent... ' + pollInformation);
    })
    .catch(function(err) {
      console.error('Error saving poll to DB:', err);
      res.status(500).send(err);
    });
  },
};