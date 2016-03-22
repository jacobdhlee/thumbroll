import React from 'react'
import LessonData from './lessonData'

class Lessons extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      display: this.props.display,
      displayListener: this.props.displayListener,
      className : this.props.className,
      //state here
      // polls?
      // students?

    };
  }

  render(){
    console.log(this.props.display);
    if(this.state.display === 'lessons') {
      console.log('true from lessons.js');
      return (
        <div>
          <h2>Today's Lessons</h2>
          <p>There are no lessons today.</p>
          <LessonData display={this.state.display} displayListener={this.state.displayListener.bind(this)} className={this.props.className}/>
        </div>
      )
    } else {
      console.log('false from lessons.js');
      return (
        <div>
          <LessonData display={this.state.display} displayListener={this.state.displayListener.bind(this)} className={this.props.className}/>
        </div>
      )
    }
  }
}

module.exports = Lessons;