var Teachers = require('../models/teachers');
var TeacherClasses = require('../models/Teacher_classes');
var Classes = require('../models/classes');
var ClassLessons = require('../models/class_lessons');
var Lessons = require('../models/lessons');


module.exports = {
  getClasses: function(req, res, next) {
    var teacherId = req.body.teacherId;
    //get all classes through TeacherClasses
    //TeacherClasses.getAllClasses(teacherId);
  },
};