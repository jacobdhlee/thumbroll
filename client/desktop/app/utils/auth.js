module.exports = {

  login(username, password, callback) {
    if(localStorage.token) {
      if(callback) {
        callback(true);
      }
      this.onChange(true);
      return;
    }
    api.login(this.state.username, this.state.password)
    .then((response) => {
      if(response.status === 400){
        if(callback) {
          callback(false);
        }
        this.onChange(false);
      } else if (response.status === 200) {
        //NEED TO HAVE TOKEN?
        localStorage.token = response.token
      }
    })
    .catch((err) => {
      console.log(this.error.err);
    });
  },

  getToken() {
    return localStorage.token
  },

  logout(callback) {
    delete localStorage.token
    if (callback) {
      callback();
    } 
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}