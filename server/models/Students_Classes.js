// id - uuid
// studentId - int (fkey to students)
// classId - int (fkey to classes)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var students_classes = sequelize.define("students_classes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        students_classes.belongsTo(models.students, {
          foreignKey: 'id', 
          as: 'studentId'
        }); 
        students_classes.belongsTo(models.classes, {
          foreignKey: 'id', 
          as: 'classId'
        }); 
      }
    }
  });
  return students_classes;
};