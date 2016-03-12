var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);
//var models = require("./models");

var PORT = process.env.PORT || 3000;


//models.sequelize.sync().then(function () {
  require('./config/routes.js')(app, express, io);

  server.listen(PORT, function (){
    console.log('listening on port', PORT);
  });

// };