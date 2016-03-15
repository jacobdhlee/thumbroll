// id - uuid
// studentId - int (fkey to students)
// classId - int (fkey to classes)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var students_classes = sequelize.define("students_classes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Foreign key
    // studentId: DataTypes.INTEGER,
    // Foreign key
    // classId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
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