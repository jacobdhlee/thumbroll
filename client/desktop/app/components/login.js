import React from 'react';
import api from '../utils/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(){
    // Invoke controller to send POST request
    console.log(this.state);

    api.login(this.state.username, this.state.password)
      .then((response) => {
        if(response.status === 400){
          this.setState({
             error: 'Username or password is incorrect',
             isLoading: false
           });
        } else if (response.status === 200) {
          var body = JSON.parse(response._bodyText);
            // pass these to teacher dashboard component:
            // classes: body.teacher.classes,
            // userId: body.teacher.uid

            // Redirect to teacher dashboard
            // userId: body.teacher.uid
            // classes: body.teacher.classes,
          }
      })
      .catch((err) => {
        this.setState({
           error: 'User not found' + err,
           isLoading: false
         });
      });
      this.setState({
        isLoading: false,
        username: '',
        password: ''
      });
  }

  render(){
    return (
      <div>
        <h1>Login</h1>
        <input
        type="text" 
        placeholder="Username" 
        value={this.state.username} 
        onChange={this.handleUsernameChange.bind(this)} 
        />
        <input
        type="password" 
        placeholder="Password" 
        value={this.state.password} 
        onChange={this.handlePasswordChange.bind(this)} 
        />
        <button type="button" onClick={this.handleSubmit.bind(this)}>
        Submit
        </button>
      </div>
    );
  }
}

module.exports = Login;