var models = require('../models');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// TODO: Remove globalTeacherCode
var globalTeacherCode = 123;


module.exports = {
  login: function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    sequelize.sync().then(function() {

      // search for user in teachers table
      models.teachers.findOne({
        where: {'username': email} 
      })
      .then(function(matchedUser){
        // if there's no match in teachers
        if (!matchedUser) { 
          // search for user in students table
          models.students.findOne({
            where: {'username': email} 
          }).then(function(matchedUser) {
            if (!matchedUser) {
              // ERROR -> client redirects to '/signup'
              res.status(400).send('Invalid user');

            } else {
              // if user is a student, compare stored password with provided password
              bcrypt.compare(password, matchedUser.dataValues.password, function(err, match) {
                if (match) {

                  // TODO: Pull classes with another query, add to object inside .then()
                  // db query
                  //.then(function(classes))
                  var studentObj = {
                    student: {
                      uid: matchedUser.dataValues.id,
                      firstName: matchedUser.dataValues.firstname,
                      lastName: matchedUser.dataValues.lastname,
                      classes: []
                    }
                  };
                  // SUCCESS -> client redirect to '/students'
                  res.status(200).send(studentObj);
                } else {
                  // ERROR: invalid password -> Client redirects to '/login'
                  res.status(400).send('Invalid password');
                }
              });
            }
          });
        } else {
          // if user is a teacher, compare stored password with provided password
          bcrypt.compare(password, matchedUser.dataValues.password, function(err, match) {
            if (match) {

              // TODO: Pull classes with another query, add to object inside .then()
              // db query
              //.then(function(classes))
              var teacherObj = {
                teacher: {
                  uid: matchedUser.dataValues.id,
                  firstName: matchedUser.dataValues.firstname,
                  lastName: matchedUser.dataValues.lastname,
                  classes: []
                }
              };

              // SUCCESS -> client redirects to '/teachers'
              res.status(200).send(teacherObj);

            } else {
              // ERROR: invalid password -> client redirects to '/login'
              res.status(400).send('Invalid password');
            }
          });
        }
      });
    });
  },

  signup: function(req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var teacherCode = req.body.teacherCode;
    var password = req.body.password;

    sequelize.sync().then(function() {

      // if invalid teacher code present, return error
      if (teacherCode && teacherCode !== globalTeacherCode) {
        
        // ERROR -> client reloads '/signup'
        res.status(500).send("Invalid teacher code.");
      }

      // if valid teacher code provided, check teachers table
      else if (teacherCode) {
        models.teachers.findOne({
          where: {'username': email}
        })
        .then(function(matchedUser) {
          // if teacher exists, send error
          if (matchedUser) { 
            // ERROR -> client reloads '/signup'
            res.status(500).send(email + " account already exists."); 
          } else {
            // if no matches are found, create new teacher account
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(password, salt, function(err, hash) {
                sequelize.sync().then(function() {
                  return models.teachers.create({
                    firstname: firstName,
                    lastname: firstName,
                    username: email,
                    username: hash
                  });
                })
                .then(function(result) {
                  
                  var user = models.teachers.findOne({
                    where:{ 'username': email }
                  });

                  // TODO: wrap inside a promise from previous query
                  var teacherObj = {
                    teacher: {
                      uid: user.dataValues.id,
                      firstName: user.dataValues.firstname,
                      lastName: user.dataValues.lastname,
                      classes: []
                    }
                  };
                  // SUCCESS: Account created -> client redirects to '/teacher'
                  res.status(200).send(teacherObj);
                });
              });
            });
          }
        });
      }
      // if no teacher code provided, assume user is student
      else {
        models.students.findOne({
           where: {'username': email}
         })
        .then(function(matchedUser) {
          // if student exists, send error
          if (matchedUser) { 
             res.status(500).send(email + " account already exists."); 
           } else {
            // if no matches are found
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(password, salt, function(err, hash) {
                sequelize.sync().then(function() {
                  return models.students.create({
                    firstname: firstName,
                    lastname: firstName,
                    username: email,
                    username: hash
                  });
                })
                .then(function(result) {

                  // create studentObj from DB query
                  var user = models.students.findOne({
                    where:{ 'username': email }
                  });

                  // TODO: wrap inside promise from previous query
                  var studentObj = {
                    student: {
                      uid: user.dataValues.id,
                      firstName: user.dataValues.firstname,
                      lastName: user.dataValues.lastname,
                      classes: []
                    }
                  };

                  // SUCCESS -> client redirects to '/student'
                  res.status(200).send(studentObj);
                });
              });
            });
          }
        });
      }
    });
  }
};