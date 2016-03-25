import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'
import LessonData from './LessonData'
import StudentData from './StudentData'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import api from '../../../../utils/api';
require('react-datepicker/dist/react-datepicker.css');



class ClassData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      className : 'The class name is from the DB! Talk to Jake and Jacob',
      classId: this.props.params.classId,
      lessons: [],
      
      displayLessons: true,
      displayStudents: false,
      newLessonName: '',
      newLessonDate: moment(),
      
      students: [],
      newStudentName: ''
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
          classId={this.state.classId}
          addStudent={this.addStudent.bind(this)}
          newStudentName={this.state.newStudentName}
          changeNewStudentName={this.changeNewStudentName.bind(this)}
          />
      </div>
    )
  }

  componentWillMount(){
    api.getClassData(this.state.classId)
    .then((response) => {
      if(response.status === 400){
        this.setState({
           error: 'No class data found',
           isLoading: false
         });
        console.log(this.state.error);
      } else if (response.status === 200) {
        response.json().then((response) => {
         console.log("CLASS RESPONSE = ", response);   
          this.setState({
            className: response.className,
            lessons: response.lessons,
            error: false,
            isLoading: false
          });

        });
      }
    });
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

      // push to DB, return lesson object and push it to lessonsCopy
      // on a .then()
      lessonsCopy.push(this.state.newLessonName);
      
      this.setState({
        lessons: lessonsCopy,
        newLessonName: ''
      });
    }
  }

  changeNewStudentName(student){
    this.setState({
      newStudentName: student,
    })
  }

  addStudent(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newStudentName.trim()){
      var studentsCopy = this.state.students.slice();

      // push to DB, return student object and push it to studentsCopy
      // on a .then()
      studentsCopy.push(this.state.newStudentName);
      
      this.setState({
        students: studentsCopy,
        newStudentName: ''
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

        <div>
          <h3>New Student</h3>
          <div>
            <form onSubmit={props.addStudent}>
              <input type='text' value={props.newStudentName} onChange={(event) => {
                props.changeNewStudentName(event.target.value);
              }} />
              
              <div>
                <button type='submit'>Add</button>
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

const Lessons = (props) => {
  if(props.display) {
    return (
      <div>
        <ul>
          {props.lessons.map((lesson) => {
            return (<li style={{cursor: 'default'}} key={"lesson:"+lesson.id}>
            <Link to={`/class/${props.classId}/lessons/${lesson}`}>{lesson.name}</Link>
            </li>)
          })}
        </ul>

        <div>
          <h3>New Lesson</h3>
          <div>
            <form onSubmit={props.addLesson}>
              <input type='text' value={props.newLessonName} onChange={(event) => {
                props.changeNewLessonName(event.target.value);
              }} />
              <DatePicker minDate={moment()} selected={props.newLessonDate} onChange={(date) => {
                props.changeDate(date);
              }} />
              <div>
                <button type='submit'>Add</button>
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