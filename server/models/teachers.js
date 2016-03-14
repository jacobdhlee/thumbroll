"use strict";

module.exports = function(sequelize, DataTypes) {
  var teachers = sequelize.define("teachers", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING  
  });
  return teachers;
};