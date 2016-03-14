// id - uuid
// name - text
// teacherId (fkey to teachers)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var classes = sequelize.define("classes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        classes.belongsTo(models.teachers, {
          foreignKey: 'id', 
          as: 'teacherId'
        }); 
      }
    }
  });
  return classes;
};