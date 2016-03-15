var models = require("./models");
var sequelize = require('sequelize');
var bcrypt = require('bcrypt');


module.exports = {
  login: function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    //TODO: check teacher db for username/pw
      //if correct, route to '/teachers' and store user on session
      //else if username is there but pw doesn't match, return pw error
      //else if username isn't there, check student db
        //if correct, route to '/students' and store user on session
        //else if username is there but pw doesn't match, return pw error
        //else navigate to '/signup'

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
              // navigate to '/signup'
            } else {
              // if user is a student, compare stored password with provided password
              bcrypt.compare(password, matchedUser.dataValues.password, function(err, match) {
                if (match) {
                  // build object with student details
                  // navigate to '/students'
                  // res.send(200, studentObj)
                } else {
                  // ERROR: invalid password
                  // redirect to '/login'
                }
              });
            }
          });
        } else {
          // if user is a teacher, compare stored password with provided password
          bcrypt.compare(password, matchedUser.dataValues.password, function(err, match) {
            if (match) {
              // build object with teacher details
              // navigate to '/teachers'
              // res.send(200, teacherObj);
            } else {
              // ERROR: invalid password
              // redirect to '/login'
            }
          });
        }
      }).catch(res.send(500, "Error while trying to find user in database."));
    });
  },

  signup: function(req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var teacherCode = req.body.teacherCode;
    var password = req.body.password;

    //TODO: sign up user
    //if no teacherCode, search student DB
      //search DB for user
        //if no user exists, create one
        //else report user already exists
    //else search teacher DB

  }
}