var Students = require('../models/students');
var Teachers = require('../models/teachers');
var sequelize = require('sequelize');


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