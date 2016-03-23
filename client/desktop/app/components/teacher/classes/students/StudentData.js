import React from 'react'

class StudentData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
    };
  }

  render(){
    if(this.props.display[0] === 'student') {
      return (
        <div>
          
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

module.exports = StudentData;