"use strict";

module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
    }
  });
  return Students;
};