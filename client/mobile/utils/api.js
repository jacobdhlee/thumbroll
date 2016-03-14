var server = 'http://localhost:3000';

module.exports = {
  login: (username, password) => {
    return 
      fetch(sever + '/login', {
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
      fetch(sever + '/signup', {
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
    return fetch(sever + '/teachers/lessons/' + classId);
  },

  getLessonData: (lessonId) => {
    return fetch(server + '/teachers/polls/' + lessonId);
  },

  startPoll: (pollObject, lessonId) => {
    return
      fetch(sever + '/teachers/polls', {
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

