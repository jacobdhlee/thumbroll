import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
      // Desktop app is currently for teachers only
      accountType: 'teacher'
    };
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
    this.setState({confirmedPassword: event.target.value});
  }



  handleSubmit(){
    // If passwords match, submit
    if (this.state.password === this.state.confirmedPassword) {
      // Invoke controller to send POST request with this.state.firstName, this.state.lastName, this.state.username
      console.log(this.state.firstName, this.state.lastName, this.state.username, this.state.email, this.state.password);
    } else {
      // Show error
    }
  }


//TODO: Add missing fields
//TODO: Add selector for student/teacher

  render(){
    return (
      <div>
        <h1>Signup</h1>
        <div>
          <text>First Name</text>
          <input
          type="text" 
          placeholder="First Name" 
          value={this.state.firstName} 
          onChange={this.handleFirstNameChange.bind(this)} 
          />
        </div>
        <div>
          <text>Last Name</text>
          <input
          type="text" 
          placeholder="Last Name" 
          value={this.state.lastName} 
          onChange={this.handleLastNameChange.bind(this)} 
          />
        </div>
        <div>
          <text>Username</text>
          <input
          type="text" 
          placeholder="Username" 
          value={this.state.username} 
          onChange={this.handleUsernameChange.bind(this)} 
          />
        </div>
        <div>
          <text>Email</text>
          <input
          type="text" 
          placeholder="Email" 
          value={this.state.email} 
          onChange={this.handleEmailChange.bind(this)} 
          />
        </div>
        <div>
          <text>Password</text>
          <input
          type="password" 
          placeholder="Password" 
          value={this.state.password} 
          onChange={this.handlePasswordChange.bind(this)} 
          />
        </div>
        <div>
          <text>Confirm Password</text>
          <input
          type="password" 
          placeholder="Confirm Password" 
          value={this.state.confirmedPassword} 
          onChange={this.handleConfirmPasswordChange.bind(this)} 
          />
        </div>
        <button type="button" onClick={this.handleSubmit.bind(this)}>
        Submit
        </button>
      </div>
    );
  }
}

module.exports = Signup;