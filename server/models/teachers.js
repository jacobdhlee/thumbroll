"use strict";

module.exports = function(sequelize, DataTypes) {
  var Teachers = sequelize.define("Teachers", {
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
  return Teachers;
};