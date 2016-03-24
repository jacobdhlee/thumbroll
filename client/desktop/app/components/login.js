import React from 'react';
import api from '../utils/api';
import auth from './../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      isLoading: false
    };
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit() {
    // Invoke controller to send POST request

    auth.login(this.state.username, this.state.password, (success) => {
      if(success) {
        this.setState({
          error: false,
          isLoading: false
        });
        // pass these to teacher dashboard component:
        // classes: body.teacher.classes,
        // userId: body.teacher.uid

        // Redirect to teacher dashboard
        // userId: body.teacher.uid
        // classes: body.teacher.classes,
        if(this.props.location.state) {
          var nextPage = this.props.location.state.nextPathName;
          this.context.router.replace(nextPage);
          return;
        }
        else {
          this.props.history.replace('/');
          return;
        }
      } else {
        this.setState({
          error: 'Username or password is incorrect',
          isLoading: false
        });
        console.log(this.state.error);
      }
      this.setState({
        isLoading: false,
        username: '',
        password: ''
      });
    });
  }

  render(){
    var showErr = this.state.error ? <div> {this.state.error} </div> : <div></div>;
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
        {showErr}
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Login;