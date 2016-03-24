var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);
var models = require("./models");
var socketLogic = require("./socketLogic");
var bodyParser = require("body-parser");
var session = require('express-session');
var path = require('path');

var PORT = process.env.PORT || 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: "Bueller",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, '../client/desktop/dist')));

models.sequelize.sync({force: true}).then(function () {
  require('./config/routes.js')(app, io);
  socketLogic(io);

  server.listen(PORT, function (){
    console.log('listening on port', PORT);
  });

  // SAMPLE DB INSERTIONS

  models.teachers.create({
    firstname: 'Teacher',
    lastname: 'Example',
    username: 't',
    // t
    password: '$2a$10$l/UC8xusY/ae.2aGtm5iNOHC3m7wzKMNYmVZuU.aWsHpSG.jqpBNm',
    email: 't@email.com'
  });

  models.teachers.create({
    firstname: 'Jake',
    lastname: 'Pace',
    username: 'jakepace',
    // 123
    password: '$2a$10$cWPLKHIJUX7YRLwJvpMrVeIi0Pxo/IATOPNJ43S2NU/2MG2Qd6rEq',
    email: 'jake@email.com'
  });

  models.teachers.create({
    firstname: 'Ian',
    lastname: 'DUBWABLANNNN',
    username: 'ianD',
    // 123
    password: '$2a$10$f1jdZ5ppWnnWXwL6Hm66/O.gWG25ajXG6KBHJKQtB1fE7rSEgFuNy',
    email: 'ian@gmail.com'
  });

  models.students.create({
    firstname: 'Student',
    lastname: 'Example',
    username: 's',
    // s
    password: '$2a$10$UR9XmBRvc90YMA9bWuXxcOqPXLK2M1QWgr1FR65wkAaNABaMlMGie',
    email: 's@email.com'
  });

  models.students.create({
    firstname: 'Shane',
    lastname: 'McGraw',
    username: 'ShaneM',
    // 123
    password: '$2a$10$cWPLKHIJUX7YRLwJvpMrVeIi0Pxo/IATOPNJ43S2NU/2MG2Qd6rEq',
    email: 'shane@email.com'
  });

  models.students.create({
    firstname: 'Jacob',
    lastname: 'Lee',
    username: 'JLee',
    // 123
    password: '$2a$10$f1jdZ5ppWnnWXwL6Hm66/O.gWG25ajXG6KBHJKQtB1fE7rSEgFuNy',
    email: 'jacob@email.com'
  });

  models.students.create({
    firstname: 'Orlando',
    lastname: 'Calrisian',
    username: 'OlandoC',
    // 123
    password: '$2a$10$cWPLKHIJUX7YRLwJvpMrVeIi0Pxo/IATOPNJ43S2NU/2MG2Qd6rEq',
    email: 'orlando@cloudcity.com'
  });

  models.classes.create({
    name: 'Quick Class',
  });

  models.lessons.create({
    name: 'Default',
    class_id: 1
  });

  models.classes.create({
    name: 'CS101',
    teacher_id: 1,
  });

  models.classes.create({
    name: 'CS102',
    teacher_id: 2,
  });

  models.classes.create({
    name: 'History',
  });

  // Needs correct fiends added
  models.students_classes.create({
    class_id: 2,
    student_id: 1
  });

  models.students_classes.create({
    class_id: 3,
    student_id: 2
  });

  models.students_classes.create({
    class_id: 3,
    student_id: 3
  });

});