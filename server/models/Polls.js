// id - uuid
// type - enum (thumbs, multiChoice)
// lessonId - int (fkey to lessons)
// preset_data - text

"use strict";

module.exports = function(sequelize, DataTypes) {
  var polls = sequelize.define("polls", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    type: DataTypes.ENUM('thumbs', 'multiChoice'), 
    preset_data: DataTypes.STRING
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