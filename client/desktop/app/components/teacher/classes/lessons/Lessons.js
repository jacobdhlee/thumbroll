import React from 'react'
import LessonData from './lessonData'

class Lessons extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      className : this.props.className,
      //state here
      // polls?
      // students?

    };
  }
 
  render(){
    return (
      <div>
        <h2 style={this.props.className === '' ? {display:'none'} : {}}>Today's Lessons</h2>
        <p style={this.props.className === '' ? {display:'none'} : {}}>There are no lessons today.</p>
        <LessonData className={this.props.className}/>
      </div>
    )
  }
}

module.exports = Lessons;