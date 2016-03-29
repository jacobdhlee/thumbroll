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
        <div className='profile' style={{marginLeft: '20%'}}>
          
          <div >
            <span>Name: </span><span>{this.state.teacherData.name}</span>
          </div>
          
          <div>
            <span>Email: </span><span>{this.state.teacherData.email}</span>
          </div>

          <li onClick={()=>{ auth.logout();
          }}>
          </li>
        </div>
        <button style={{marginLeft: '20%'}}>Logout</button>
      </div>
    )
  }
}


module.exports = Profile;