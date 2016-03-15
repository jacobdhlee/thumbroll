var app = require('express')();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);
var models = require("./models");
var socketLogic = require("./socketLogic");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


models.sequelize.sync({force: true}).then(function () {
  require('./config/routes.js')(app, express, io);

  server.listen(PORT, function (){
    console.log('listening on port', PORT);
  });

// SAMPLE DB INSERTIONS
models.teachers.create({
                      firstname: 'Jake',
                      lastname: 'Pace',
                      username: 'jakepace',
                      password: 'pass',
                      createdAt: Date.now()
                    });

models.teachers.create({
                      firstname: 'Ian',
                      lastname: 'DUBWABLANNNN',
                      username: 'ianD',
                      password: 'pass123',
                      createdAt: Date.now()
                    });


models.students.create({
                      firstname: 'Shane',
                      lastname: 'McGraw',
                      username: 'ShaneM',
                      password: 'passworddd',
                      createdAt: Date.now()
                    });


models.classes.create({
                      name: 'CS101',
                      // teacherID field not populating
                      teacherId: 1,
                      createdAt: Date.now()
                    });


models.classes.create({
                      name: 'CS102',
                      // teacherID field not populating
                      teacherId: 2,
                      createdAt: Date.now()
                    });

models.classes.create({
                      name: 'History',
                      // teacherID field not populating
                      createdAt: Date.now()
                    });


// Needs correct fiends added
// models.students_classes.create({
//                     });

});