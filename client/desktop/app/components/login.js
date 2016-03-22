import React from 'react';

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
    console.log(this.state.username, this.state.password);
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