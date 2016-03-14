// id - uuid
// studentId - int (fkey to students)
// classId - int (fkey to classes)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Students_Classes = sequelize.define("Students_Classes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Students_Classes.belongsTo(Students, {
          foreignKey: 'id', 
          as: 'StudentId'
        }); 
        Students_Classes.belongsTo(Classes, {
          foreignKey: 'id', 
          as: 'ClassId'
        }); 
      }
    }
  });
  return Students_Classes;
};