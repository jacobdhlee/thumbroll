// id - uuid
// type - enum (thumbs, multiChoice)
// lessonId - int (fkey to lessons)
// preset_data - text

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Polls = sequelize.define("Polls", {
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
        Polls.belongsTo(models.Teachers, {
          foreignKey: 'id', 
          as: 'teacherId'
        }); 
        Polls.belongsTo(models.Lessons, {
          foreignKey: 'id', 
          as: 'LessonId'
        }); 
      }
    }
  });
  return Polls;
};