var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);

var PORT = 3000;


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/socketTest.html');
})

io.on('connection', function(client) {  
    console.log('Client connected!');
    client.on('join', function(data) {
      console.log(data);
    });
    client.on('disconnect', function(client) {
      console.log('Bye!\n');
    });
});


server.listen(PORT, function (){
  console.log('listening on port', PORT);
});