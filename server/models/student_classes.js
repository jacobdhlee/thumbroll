// id - uuid
// studentId - int (fkey to students)
// classId - int (fkey to classes)


// Create table with UUID only

// Add studentID to the table
// student_classes.belongsTo(Students, {foreignKey: 'studentId'}); 

// Add classID to the table
// student_classes.belongsTo(Classes, {foreignKey: 'classId'}); 