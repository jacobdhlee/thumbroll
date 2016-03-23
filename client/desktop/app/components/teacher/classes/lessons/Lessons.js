import React from 'react'
import LessonData from './lessonData'

class Lessons extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      displayListener: this.props.displayListener,
      className : this.props.className,
      //state here
      // polls?
      // students?

    };
  }

  render(){
    if(this.props.display[0] === 'class') {
      return (
        <div>
          <LessonData display={this.props.display} displayListener={this.state.displayListener.bind(this)} className={this.props.className}/>
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

module.exports = Lessons;