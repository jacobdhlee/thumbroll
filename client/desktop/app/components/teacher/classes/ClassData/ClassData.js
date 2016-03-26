import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'
import LessonData from './LessonData'
import StudentData from './StudentData'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import api from '../../../../utils/api';
require('react-datepicker/dist/react-datepicker.css');
import {Button, Card, Row, Col} from 'react-materialize';


class ClassData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      className : '',
      classId: this.props.params.classId,
      classLessons: [],
      classStudents: [],
      studentPolls: [],
      lessonPolls: [],
      
      displayLessons: true,
      displayStudents: false,
      newLessonName: '',
      newLessonDate: moment(),
      
      newStudent: '',
      studentError: ''
    };
  }

  render(){
    return (
      <div>

        <h2 style={{color: '#03A9F4'}} >{this.state.className}</h2>
        <ul>
          <li onClick={() => this.setState({
            displayLessons: true,
            displayStudents: false,
          })} style={{
            cursor: 'default',
            }}>Lessons</li>

          <li onClick={this.switchToStudentsView.bind(this)} style={{cursor: 'default'}}>Students</li>
        </ul>
        
        <Lessons 
          newLessonDate={this.state.newLessonDate}
          newLessonName={this.state.newLessonName} 
          addLesson={this.addLesson.bind(this)}
          handleLessonClick={this.handleLessonClick}
          changeNewLessonName={this.changeNewLessonName.bind(this)}
          changeDate={this.changeDate.bind(this)} 
          lessons={this.state.classLessons} 
          display={this.state.displayLessons} 
          classId={this.state.classId}/>

        <Students 
          students={this.state.classStudents} 
          display={this.state.displayStudents} 
          classId={this.state.classId}
          handleStudentClick={this.handleStudentClick}
          addStudent={this.addStudent.bind(this)}
          newStudent={this.state.newStudent}
          changeNewStudent={this.changeNewStudent.bind(this)}
          />
      </div>
    )
  }

  componentWillMount(){
    api.getClassName(this.state.classId)
    .then((response) => {
      if(response.status === 200) {
        response.json().then((response) => {
          this.setState({
            className: response.name
          });
          api.getClassLessonsData(this.state.classId)
          .then((response) => {
            if(response.status === 400){
              this.setState({
                 error: 'Data forbidden',
                 isLoading: false
               });
              console.error(this.state.error);
            } else if (response.status === 200) {
              response.json().then((response) => {
               console.log("Class lessons from DB:", response);   
                this.setState({
                  classLessons: response,
                  error: false,
                  isLoading: false
                });
              });
            }
          });
        });
      }
    })
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

  switchToStudentsView() {
    this.setState({
      displayStudents: true,
      displayLessons: false,
      isLoading: true,
    });
    api.getClassStudentsData(this.state.classId)
    .then((response) => {
      if(response.status === 400){
        this.setState({
           error: 'Data forbidden',
           isLoading: false
         });
        console.error(this.state.error);
      } else if (response.status === 200) {
        response.json().then((response) => {
         console.log("Class students from DB:", response);   
          this.setState({
            classStudents: response,
            error: false,
            isLoading: false
          });
        });
      }
    });
  }

  handleLessonClick(e) {
    console.log(e)
  }

  handleStudentClick(e) {
    console.log(e)
  }

  addLesson(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newLessonName.trim()){
      var newLessonName = this.state.newLessonName.trim();
      var lessonsCopy = this.state.lessons.slice();
      var newLessonDate = this.state.newLessonDate;

      // TODO: push to DB, return lesson object and push it to lessonsCopy
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
           var lessonsCopy = this.state.lessons.slice();
           lessonsCopy.push(response);

            this.setState({
              lessons: lessonsCopy,
              newLessonName: '',
              error: false,
              isLoading: false,
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
           console.log('STUDENT WAS CREATED: ' + response.created)
           if (response.created === false){
             this.setState({
               studentError: "Student already enrolled in this class"
             });
             console.log(this.state.studentError);
           } else {
             console.log("ADDED STUDENT = ", response);  
             var studentsCopy = this.state.students.slice();
             studentsCopy.push(response);

              this.setState({
                students: studentsCopy,
                newStudent: '',
                error: false,
                isLoading: false
              });
            }
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
        <StudentTable students={props.students} handleStudentClick={props.handleStudentClick} />
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
        <LessonTable lessons={props.lessons} handleLessonClick={props.handleLessonClick} />
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

const LessonTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th> Lesson </th>
          <th> Count of Polls </th>
          <th> Response Count </th>
          <th> Accuracy </th>
          <th> Average Thumb </th>
        </tr>
      </thead>
      <tbody>
      {props.lessons.map((lesson) => {
        var correctRate = lesson.correct_response_count / lesson.potential_correct_responses_count * 100;
        return (
          <tr>
            <td onClick={props.handleLessonClick}> {lesson.lesson_name} </td>
            <td> {lesson.poll_count ? lesson.poll_count : 0} </td>
            <td> {lesson.response_count? lesson.response_count : 0} </td>
            <td> {correctRate ? correctRate + '%' : 'N/A'} </td>
            <td> {lesson.average_thumb ? lesson.average_thumb + '%' : 'N/A'} </td>
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}

const StudentTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> Lessons Attended </th>
          <th> Response Count </th>
          <th> PLACEHOLDER </th>
          <th> Average Thumb </th>
        </tr>
      </thead>
      <tbody>
      {props.students.map((student) => {
        // var correctRate = lesson.correct_response_count / lesson.potential_correct_responses_count * 100;
        return (
          <tr>
            <td onClick={props.handleStudentClick}> {student.first_name + ' ' + student.last_name} </td>
            <td> {student.lesson_count ? student.lesson_count : 0} </td>
            <td> {student.response_count ? student.response_count : 0} </td>
            <td> {student.response_count} </td>
            <td> {student.average_thumb ? student.average_thumb + '%' : 'N/A' } </td>
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}

module.exports = ClassData;