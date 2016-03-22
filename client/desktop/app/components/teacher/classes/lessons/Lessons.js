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
        <h2>Today's Lessons</h2>
        <p>There are no lessons today.</p>
        <LessonData className={this.props.className}/>
      </div>
    )
  }
}

module.exports = Lessons;