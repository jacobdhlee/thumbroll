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
        <h2>Your Profile</h2>
        <h2>Your Classes</h2>
        <h2>Logout</h2>
      </div>)
    } else{
      return (<div></div>)
    }
  }
}

module.exports = Settings;