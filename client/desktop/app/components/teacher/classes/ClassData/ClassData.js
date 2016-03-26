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
      newStudent: '',
      studentError: ''
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
          newStudent={this.state.newStudent}
          changeNewStudent={this.changeNewStudent.bind(this)}
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
            students: response.students,
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
      var newLessonName = this.state.newLessonName.trim();
      var lessonsCopy = this.state.lessons.slice();
      var newLessonDate = this.state.newLessonDate;

      // push to DB, return lesson object and push it to lessonsCopy
      // on a .then()

      api.addLesson(this.state.classId, newLessonName, newLessonDate)
      .then((response) => {
        if(response.status === 500){
          this.setState({
             error: 'Lesson could not be added',
             isLoading: false
           });
          console.log(this.state.error);
        } else if (response.status === 200) {
          response.json().then((response) => {
           console.log("ADDED LESSON = ", response);   
           var studentsCopy = this.state.students.slice();
           lessonsCopy.push(response);

            this.setState({
              lessons: lessonsCopy,
              newLessonName: '',
              error: false,
              isLoading: false
            });
          });
        }
      });
      
      this.setState({
        lessons: lessonsCopy,
        newLessonName: ''
      });
    }
  }

  changeNewStudent(student){
    this.setState({
      newStudent: student,
    })
  }

  addStudent(e){
    e.preventDefault();
    
    // If there is newStudent data in state, call API
    if(!!this.state.newStudent.trim()){
      var newStudentEmail = this.state.newStudent.trim();

      // push to DB, return student object and push it to studentsCopy
      api.addStudentToClass(this.state.classId, newStudentEmail)
      .then((response) => {
        if(response.status === 400){
          this.setState({
             error: 'Student not found',
             isLoading: false
           });
          console.log(this.state.error);
        } else if (response.status === 200) {
          response.json().then((response) => {
           console.log("ADDED STUDENT = ", response);   
           var studentsCopy = this.state.students.slice();
           studentsCopy.push(response);

            this.setState({
              students: studentsCopy,
              newStudent: '',
              error: false,
              isLoading: false
            });
          });
        } else if (response.status === 500) {
          console.log("SERVER ERROR: FAILED TO ADD STUDENT");   
            this.setState({
              error: "Failed to add student",
              isLoading: false
            });
        }
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
            return (<li style={{cursor: 'default'}} key={"student:" + student.student.id}>
            <Link to={`/class/${props.classId}/students/${student.student.id}`}>{student.student.firstname + " " + student.student.lastname}</Link>
            </li>)
          })}
        </ul>

        <div>
          <h3>Add Student</h3>
          <div>
            <form onSubmit={props.addStudent}>
              <input type='text' placeholder='email address' value={props.newStudent} onChange={(event) => {
                props.changeNewStudent(event.target.value);
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