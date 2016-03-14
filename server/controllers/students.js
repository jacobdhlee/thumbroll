//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
// var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');

module.exports = function(io){

  var functionTable = {};

  functionTable.readyStage = function(req, res, next) {

    io.on('connection', function(client){
      console.log('Hey, server! A student is ready to learn!');
      
      client.emit('greeting', 'Hello, student!');

      client.on('responseRecorded', function(data){
        io.sockets.emit('responseRecordedFromStudent', data);
      });

    });
    res.send(responseHTML);
  };
  
  return functionTable;
};