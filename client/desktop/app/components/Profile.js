import React from 'react'
import {Route, RouteHandler, Link, Button} from 'react-router'

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

  render(){
    return(
      <div>
        <h2 className='sectionHeading'>Settings</h2>
          <div>
            <span>Name: </span><span>{this.state.teacherData.name}</span>
          </div>
          <div>
          <span>Email: </span><span>{this.state.teacherData.email}</span>
          </div>
          <li>
          <button>Edit</button>
          </li>
          <li onClick={()=>{ auth.logout();
          }}>
          <button>Logout</button>
          </li>
      </div>
    )
  }
}


module.exports = Profile;