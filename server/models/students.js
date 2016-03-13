"use strict";

module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {
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
  return Students;
};