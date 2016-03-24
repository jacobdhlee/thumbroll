import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'
import LessonData from './LessonData'
import StudentData from './StudentData'

class ClassData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      className : 'The class name is from the DB! Talk to Jake and Jacob',
      classId: this.props.params.classId,
      lessons: ['1'],
      students: ['bobby', 'sally'],
      displayLessons: true,
      displayStudents: false

    };
    console.log(this.state.classId);
  }

  render(){
    return (
      <div>
        <h2>{this.state.className}</h2>
        <ul>
          <li onClick={() => this.setState({
            displayLessons: true,
            displayStudents: false,
          })}>Lessons</li>

          <li onClick={() => this.setState({
            displayStudents: true,
            displayLessons: false,
          })}>Students</li>
        </ul>
        
        <Lessons lessons={this.state.lessons} display={this.state.displayLessons} classId={this.state.classId}/>
        <Students students={this.state.students} display={this.state.displayStudents} classId={this.state.classId}/>
      </div>
    )
  }

  componentWillMount(){
    // query the DB for all lessons with a given class ID given in the URL param
    // place in state at this.state.lessons
    // also get the class name from the DB and put in state
  }
}

const Students = (props) => {
  if(props.display) {
    return (
      <div>
        <ul>
        {console.log(props.students)}
          {props.students.map((student) => {
            return (<li style={{cursor: 'default'}} key={student}>
            <Link to={`/class/${props.classId}/students/${student}`}>{student}</Link>
            </li>)
          })}
        </ul>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const Lessons = (props) => {
  if(props.display) {
    return (
      <div>
        <ul>
          {props.lessons.map((lesson) => {
            return (<li style={{cursor: 'default'}} key={lesson}>
            <Link to={`/class/${props.classId}/lessons/${lesson}`}>{lesson}</Link>
            </li>)
          })}
        </ul>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

module.exports = ClassData;