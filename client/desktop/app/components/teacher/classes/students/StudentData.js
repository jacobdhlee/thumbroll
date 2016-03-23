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
          <h1>Student Data from Bobby here</h1>
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