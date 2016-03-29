import React from 'react'
import {Route, RouteHandler, Link, Button} from 'react-router'
var auth = require('./../utils/auth');

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teacherData: {
        name: 'Teachy McTeacherton',
        email: 'teachy@teach.er'
      }
    };
  }

  handleLogout() {
    auth.logout();
    this.context.router.push({
      pathname: '/login'
    });
  }

  render(){
    return(
      <div>
        <h2 className='sectionHeading'>Settings</h2>
        <div className='profile' style={{marginLeft: '20%'}}>
          
          <div >
            <span>Name: </span><span>{this.state.teacherData.name}</span>
          </div>
          
          <div>
            <span>Email: </span><span>{this.state.teacherData.email}</span>
          </div>
        </div>
        <button onClick={this.handleLogout.bind(this)} style={{marginLeft: '20%'}}>Logout</button>
      </div>
    )
  }
}

Profile.contextTypes = {
  router: React.PropTypes.any.isRequired
};

module.exports = Profile;