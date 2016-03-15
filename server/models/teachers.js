"use strict";

module.exports = function(sequelize, DataTypes) {
  var teachers = sequelize.define("teachers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {

        // Set bi-directional relationship
        // Creates field, but can't be
        teachers.hasMany(models.classes, {
          foreignKey: 'teacherId',
          // 
          onDelete: 'set null',
          onUpdate: 'cascade'
        }); 
      }
    }
  });
  return teachers;
};