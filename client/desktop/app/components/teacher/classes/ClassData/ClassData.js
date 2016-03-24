import React from 'react'
import LessonData from './LessonData'
import StudentData from './StudentData'

class ClassData extends React.Component {
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
        <LessonData className={this.props.className}/>
        <StudentData className={this.props.className}/>  
        {this.props.students}
      </div>
    )
  }
}

module.exports = ClassData;