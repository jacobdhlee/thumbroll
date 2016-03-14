// id - uuid
// name - text
// teacherId (fkey to teachers)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Classes = sequelize.define("Classes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Classes.belongsTo(Teachers, {
          foreignKey: 'id', 
          as: 'teacherId'
        }); 
      }
    }
  });
  return Classes;
};