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

  signup: (username, password) => {
    return
      fetch(sever + '/signup', {
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

  getLessons: (classId) => {
    return fetch(sever + '/teachers/lessons/' + classId);
  }
}

