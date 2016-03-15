module.exports = function(io) {
  
  var poll = {
    responseId: 1,
    type: 'thumbs',
    datetime: new Date(),
    lessonId: 13,
  };

  io.on('connection', function(client){

    //TEACHER CODE
      
    client.on('studentConnect', function(data) {
      // FRONTEND-LISTENER: client.on('newStudentConnected', (studentInfo) => {display(studentCount++ and studentInfo);});
      
      //TODO: DB.write('newStudentConnected', data);
      console.log('Student connected');
    });

    client.on('studentResponse', function(data) {
      // write data to the DB
      // TODO: DB query writing data

      // display data on frontend
      // FRONTEND-LISTENER: client.on('studentData', (data) => {display(data)});
      //client.emit('studentData', data);
      console.log(data);
    });

    client.on('teacherConnect', function(data) {
      console.log('Teacher connected');
    });


    //STUDENT CODE



  });
};