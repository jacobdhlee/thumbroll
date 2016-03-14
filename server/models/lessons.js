// id
// name
// date
// classId (fkey to classes id)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Lessons = sequelize.define("Lessons", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Lessons.belongsTo(models.Classes, {
          foreignKey: 'id', 
          as: 'classId'
        }); 
      }
    }
  });
  return Lessons;
};