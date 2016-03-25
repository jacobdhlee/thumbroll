import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'
import LessonData from './LessonData'
import StudentData from './StudentData'
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker.css');



class ClassData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      className : 'The class name is from the DB! Talk to Jake and Jacob',
      classId: this.props.params.classId,
      lessons: ['1'],
      students: ['bobby', 'sally'],
      displayLessons: true,
      displayStudents: false,
      newLessonName: '',
      newLessonDate: moment()
    };
  }

  render(){
    return (
      <div>
        <h2>{this.state.className}</h2>
        <ul>
          <li onClick={() => this.setState({
            displayLessons: true,
            displayStudents: false,
          })} style={{cursor: 'default'}}>Lessons</li>

          <li onClick={() => this.setState({
            displayStudents: true,
            displayLessons: false,
          })} style={{cursor: 'default'}}>Students</li>
        </ul>
        
        <Lessons 
          newLessonDate={this.state.newLessonDate}
          newLessonName={this.state.newLessonName} 
          addLesson={this.addLesson.bind(this)}
          changeNewLessonName={this.changeNewLessonName.bind(this)}
          changeDate={this.changeDate.bind(this)} 
          lessons={this.state.lessons} 
          display={this.state.displayLessons} 
          classId={this.state.classId}/>

        <Students 
          students={this.state.students} 
          display={this.state.displayStudents} 
          classId={this.state.classId}/>
      </div>
    )
  }

  componentWillMount(){
    // query the DB for all lessons with a given class ID given in the URL param
    // place in state at this.state.lessons
    // also get the class name from the DB and put in state
  }

  changeDate(newDate){
    this.setState({
      newLessonDate: newDate
    });
  }

  changeNewLessonName(lesson){
    this.setState({
      newLessonName: lesson,
    })
  }

  addLesson(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newLessonName.trim()){
      var lessonsCopy = this.state.lessons.slice();
      lessonsCopy.push(this.state.newLessonName);

      // push to DB with this.state.newLessonDate
      
      this.setState({
        lessons: lessonsCopy,
        newLessonName: ''
      });
    }
  }
}

const Students = (props) => {
  if(props.display) {
    return (
      <div>
        <ul>
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

        <div>
          <div>
            <form onSubmit={props.addLesson}>
              <input type='text' value={props.newLessonName} onChange={(event) => {
                props.changeNewLessonName(event.target.value);
              }} />
              <DatePicker minDate={moment()} selected={props.newLessonDate} onChange={(date) => {
                props.changeDate(date);
              }} />
              <div>
                <button type='submit'>Add new lesson</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

module.exports = ClassData;