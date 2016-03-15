var env = require('./environment');
var server = 'http://' + env.server + ':' + env.port;

module.exports = {
  login: (username, password) => {
    return 
      fetch(server + '/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  },

  signup: (username, password, teacherOrStudent) => {
    return
      fetch(server + '/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          type: teacherOrStudent
        })
      });
  },

  getLessons: (classId) => {
    return fetch(server + '/teachers/lessons/' + classId);
  },

  getLessonData: (lessonId) => {
    return fetch(server + '/teachers/polls/' + lessonId);
  },
  
  startPoll: (pollObject, lessonId) => {    
      return fetch(server + '/teachers/polls', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollObject: pollObject,
          lessonId: lessonId
        })
      });
  }
}

