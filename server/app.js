var app = require('express')();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);
var models = require("./models");

var StudentsController = require('./controllers/students');


var PORT = process.env.PORT || 3000;


models.sequelize.sync().then(function () {
  require('./config/routes.js')(app, io);

  server.listen(PORT, function (){
    console.log('listening on port', PORT);
  });

});
