//var Teachers = require('../models/teachers');
//var TeacherClasses = require('../models/Teacher_classes');
//var Classes = require('../models/classes');
//var ClassLessons = require('../models/class_lessons');
// var Lessons = require('../models/lessons');
//var RequestedResponses = require('../models/requested_responses');

module.exports = {
  readyStage: function(io, req, res, next) {

    io.on('connection', function(client){
      console.log('Hey, server! A student is ready to learn!');
      
      client.emit('greeting', 'Hello, student!');

      client.on('responseRecorded', function(data){
        io.sockets.emit('responseRecordedFromStudent', data);
      });

      


    });
    var responseHTML = `<!doctype html> <html lang='en'> <head> </head> <body> <h1>Thumbroll</h1> <p></p><button id='submit'>Record Response</button><script></script> <script src='https://code.jquery.com/jquery-1.10.2.js'></script> <script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.js'></script> <script>var socket=io.connect('http://localhost:3000'); socket.on('connect', function(data){socket.emit('studentJoin', 'Hiya, Teach! It's a student!');}); socket.on('thumbsCheck', function(data){console.log('new poll received'); $('p').html(data);}); socket.on('greeting', function(data){console.log(data);}); $('submit').on('click', function(){io.socket.emit('responseRecordedFromStudent');}); </script> </body></html>`;

    res.send(responseHTML);

  },

};