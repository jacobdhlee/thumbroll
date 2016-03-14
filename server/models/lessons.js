// id
// name
// date
// classId (fkey to classes id)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var lessons = sequelize.define("lessons", {
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
        lessons.belongsTo(models.classes, {
          foreignKey: 'id', 
          as: 'classId'
        }); 
      }
    }
  });
  return lessons;
};