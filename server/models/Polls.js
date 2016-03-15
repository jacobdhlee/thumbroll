// id - uuid
// type - enum (thumbs, multiChoice)
// lessonId - int (fkey to lessons)
// preset_data - text

"use strict";

module.exports = function(sequelize, DataTypes) {
  var polls = sequelize.define("polls", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.ENUM('thumbs', 'multiChoice'),
    // foreign key 
    // teacherId: DataTypes.INTEGER,
    // foreign key
    // lessonId: DataTypes.INTEGER,
    preset_data: DataTypes.STRING,
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
        polls.belongsTo(models.teachers, {
          foreignKey: 'id', 
          as: 'teacherId'
        }); 
        polls.belongsTo(models.lessons, {
          foreignKey: 'id', 
          as: 'lessonId'
        }); 
      }
    }
  });
  return polls;
};