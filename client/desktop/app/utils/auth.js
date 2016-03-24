var api = require('./api');

module.exports = {

  login(username, password, callback) {
    api.login(username, password)
    .then((response) => {
      if(response.status === 400){
        if(callback) {
          callback(false);
        }
      } else if (response.status === 200) {
        response.json()
        .then(function(body) {
          localStorage.token = true;
          if(callback) {
            callback(true);
          }
        });
      }
    })
    .catch((err) => {
      console.error('Error with login' + err);
    });
  },

  logout(callback) {
    delete localStorage.token;
    if (callback) {
      callback();
    } 
  },

  loggedIn() {
    return !!localStorage.token
  },

  checkForSession() {
    delete localStorage.token;
    // localStorage.token = true;
    return false;
    // send api request to protected route
    // if response.status === 401, i don't have access
      // return false;
    // else, 
      // localStorage.token = true;
      // it will return userID / login data
  }

}