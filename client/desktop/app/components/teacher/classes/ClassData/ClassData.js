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
      lessons: ['LessonData is here too'],

    };
    console.log(this.state.classId);
  }

  render(){
    return (
      <div>
        <h2>{this.state.className}</h2>
        
        <li><Link to={`/classes/${this.state.classId}/students`}>{specificClass}</Link></li>
        <ul>
          {this.state.lessons.map((lesson) => {
            return (<li style={{cursor: 'default'}} key={lesson}>
            <Link to={`/classes/${this.state.classId}/lessons/${lesson}`}>{lesson}</Link>
            </li>)
          })}
        </ul>
      </div>
    )
  }

  componentWillMount(){
    // query the DB for all lessons with a given class ID given in the URL param
    // place in state at this.state.lessons
    // also get the class name from the DB and put in state
  }
}

module.exports = ClassData;