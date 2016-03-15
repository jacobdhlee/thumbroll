module.exports = function(io) {
  
  var poll = {
    responseId: 1,
    type: 'thumbs',
    datetime: new Date(),
    lessonId: 13,
  };

  io.on('connection', function(client){

    //TEACHER CODE
      
    client.on('studentStandby', function(data) {
      // FRONTEND-LISTENER: client.on('newStudentConnected', (studentInfo) => {display(studentCount++ and studentInfo);});
      client.emit('newStudentConnected', data);
    });

    // setTimeout(function(){
    //   io.sockets.emit('newPoll', poll);
    // }, 5000);

    client.on('responseFromStudent', function(data) {
      // write data to the DB
      // TODO: DB query writing data

      // display data on frontend
      // FRONTEND-LISTENER: client.on('studentData', (data) => {display(data)});
      client.emit('studentData', data);
    });
    //res.status(201).send('Hello from the client side');

    client.on('teacherConnect', function(data) {
      console.log('Teacher connected');
    });


    //STUDENT CODE

    client.on('studentConnect', function(data) {
      console.log('Student connected');
    });

    client.on('newPoll', function(data) {
      client.emit(data);
    });

    setTimeout(function(){
      io.sockets.emit('responseFromStudent');
    }, 5000);


  });
};