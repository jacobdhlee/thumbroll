"use strict";

module.exports = function(sequelize, DataTypes) {
  var Teachers = sequelize.define("Teachers", {
    id: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });
  
  return Teachers;
};