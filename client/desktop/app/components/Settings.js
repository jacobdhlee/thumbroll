import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'
import auth from './../utils/auth'

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
        <ul style={{marginBottom: '1em'}}>
          <li><Link className='large material-icons' style={
              {
                color: '#03A9F4',
              }}
              to={`/profile`}>settings</Link></li>
        </ul>
      </div>)
    } else{
      return (<div></div>)
    }
  }
}

module.exports = Settings;