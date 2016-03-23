import React from 'react'

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
          <li>Your Profile</li>
          <li onClick={()=>{
            that.props.displayListener('auth');
          }} style={{cursor: 'default'}}>Logout</li>
        </ul>
      </div>)
    } else{
      return (<div></div>)
    }
  }
}

module.exports = Settings;