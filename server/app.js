var app = require('express')();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);
var models = require("./models");
var socketLogic = require("./socketLogic");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


models.sequelize.sync().then(function () {
  require('./config/routes.js')(app, io);

  //deploy socketLogic

  socketLogic(io);





  server.listen(PORT, function (){
    console.log('listening on port', PORT);
  });

});