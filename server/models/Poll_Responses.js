// id - uuid
// studentId - int (fkey to students)
// pollId - int (fkey to polls)
// responseVal - text

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Poll_Responses = sequelize.define("Poll_Responses", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    responseVal: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Poll_Responses.belongsTo(models.Students, {
          foreignKey: 'id', 
          as: 'studentId'
        }); 
        Poll_Responses.belongsTo(models.Polls, {
          foreignKey: 'id', 
          as: 'pollId'
        }); 
      }
    }
  });
  return Poll_Responses;
};