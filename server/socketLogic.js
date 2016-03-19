var models = require("./models");

module.exports = function(io) {
  
  var poll = {
    responseId: 1,
    type: 'thumbs',
    datetime: new Date(),
    lessonId: 13,
  };

  io.on('connection', function(client){
    //TEACHER CODE
    client.on('teacherConnect', function(data) {
      var classId = data.classId;
      client.join('room' + classId);
      console.log('Teacher connected to room', 'room' + classId);
    });

    //maybe not necessary since basically the same as above
    client.on('teacherQuickClass', function(data) {
      var classId = data.classId;
      client.join('room' + classId);
      console.log('Teacher connected to quick class room', 'room' + classId);
    });

    client.on('studentResponse', function(data) {
      console.log('INCOMING STUDENT RESPONSE:', data);
      var room;
      for(key in client.rooms) {
        if(key.substring(0,4) === 'room') {
          room = key;
        }
      }
      io.sockets.to(room).emit('studentResponseForTeacher', data);

      //TODO: only save if not quick class?
      models.poll_responses.create({
        response_val: data.answer,
        student_id: data.userId,
        poll_id: data.pollId
      })
      .catch(function(err) {
        console.error('Error saving student', data.userId, 'poll response to DB:', err);
      });
    });

    //STUDENT CODE
    client.on('studentConnect', function(data) {
      // FRONTEND-LISTENER: client.on('newStudentConnected', (studentInfo) => {display(studentCount++ and studentInfo);});
      var userId = data.userId;
      var classId = data.classId;
      client.join('room' + classId);
      console.log('Student', userId, 'connected to', 'room' + classId);
      //TODO: DB.write('newStudentConnected', data);
    });

    client.on('studentLeavingClass', function(data) {
      var userId = data.userId;
      var classId = data.classId;
      client.leave('room' + classId);
      console.log('Student', userId, 'leaving', 'room' + classId);
    });

  });
};