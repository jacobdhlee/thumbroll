var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);
//var models = require("./models");

var PORT = process.env.PORT || 3000;


//models.sequelize.sync().then(function () {

  io.on('connection', function(client) {
    console.log('Someone connected!');

    client.on('join', function(data) {
      if(data === 'This is your teacher speaking') {
        client.emit('greeting', 'Hiya, Teach!');
      } else{
        client.emit('greeting', 'Hello, student. Please wait for your instructor to open a new poll.');
      }
    });

    client.on('newPoll', function(data) {
      io.sockets.emit('openPoll', data);
    });

    client.on('disconnect', function(client) {
      console.log('Bye!\n');
    });
  });

  require('./config/routes.js')(app, express);

  server.listen(PORT, function (){
    console.log('listening on port', PORT);
  });

// };