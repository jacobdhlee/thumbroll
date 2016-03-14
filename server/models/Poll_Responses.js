// id - uuid
// studentId - int (fkey to students)
// pollId - int (fkey to polls)
// responseVal - text

"use strict";

module.exports = function(sequelize, DataTypes) {
  var poll_responses = sequelize.define("poll_responses", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    responseVal: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        poll_responses.belongsTo(models.students, {
          foreignKey: 'id', 
          as: 'studentId'
        }); 
        poll_responses.belongsTo(models.polls, {
          foreignKey: 'id', 
          as: 'pollId'
        }); 
      }
    }
  });
  return poll_responses;
};