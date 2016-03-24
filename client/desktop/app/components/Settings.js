import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    var that = this;
    if(that.props.display) {
      return (<div>
        <ul>
          <li><Link to={`/profile`}>Your Profile</Link></li>
          <li onClick={()=>{
          }} style={{cursor: 'default'}}>Logout</li>
        </ul>
      </div>)
    } else{
      return (<div></div>)
    }
  }
}

module.exports = Settings;