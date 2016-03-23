import React from 'react'
import LessonData from './LessonData'
import StudentData from './StudentData'

class ClassData extends React.Component {
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
          <StudentData display={this.props.display} displayListener={this.state.displayListener.bind(this)} className={this.props.className}/>  
          {this.props.students}
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

module.exports = ClassData;