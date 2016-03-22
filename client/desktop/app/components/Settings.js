import React from 'react'

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    if(this.props.display) {
      return (<div>
        <ul>
          <li>Your Profile</li>
          <li>Your Classes</li>
          <li>Logout</li>
        </ul>
      </div>)
    } else{
      return (<div></div>)
    }
  }
}

module.exports = Settings;