import React from 'react'
import {Route, RouteHandler, Router, Link} from 'react-router'
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
      studentError: '',

    };
  }

  render(){
    return (
      <div>

        <h2 className='sectionHeading classDataHeading' style={{color: '#424242'}} >{this.state.className}</h2>
        
        <Row className='dataRow'>
          <Col s={2} l={4}>
          &nbsp;
          </Col>
          <Col s={6} l={4}>
            <ul className="tabs">

              <li className='tab col s1 active center-align' onClick={() => this.setState({
                displayLessons: true,
                displayStudents: false,
              })} style={{
                cursor: 'default',
                }}
                style={this.state.displayLessons ? {backgroundColor:'#01579b'} : {backgroundColor:'#fafafa', color: '#424242', cursor:'default'}}
                >Lessons</li>
              <li className='tab col s1 center-align' 
                onClick={this.switchToStudentsView.bind(this)} 
                style={{cursor: 'default'}} 
                style={!this.state.displayLessons ? {backgroundColor:'#01579b'} : {backgroundColor:'#fafafa', color: '#424242', cursor:'default'}}>
                Students
              </li>
            </ul>
          </Col>
          <Col s={4} l={4}>
          </Col>
        </Row>
        
        <Lessons 
          newLessonDate={this.state.newLessonDate}
          newLessonName={this.state.newLessonName} 
          addLesson={this.addLesson.bind(this)}
          handleLessonClick={this.handleLessonClick.bind(this)}
          changeNewLessonName={this.changeNewLessonName.bind(this)}
          changeDate={this.changeDate.bind(this)} 
          lessons={this.state.classLessons} 
          display={this.state.displayLessons}
          classId={this.state.classId}/>

        <Students 
          students={this.state.classStudents} 
          display={this.state.displayStudents} 
          classId={this.state.classId}
          handleStudentClick={this.handleStudentClick.bind(this)}
          addStudent={this.addStudent.bind(this)}
          newStudent={this.state.newStudent}
          changeNewStudent={this.changeNewStudent.bind(this)}
          >
          <StudentError studentError={this.state.studentError}/>
        </Students>

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

  handleLessonClick(lessonId, lessonName) {
    this.context.router.push({
      pathname: '/class/' + this.state.classId + '/lessons/' + lessonId,
      state: { 
        className: this.state.className,
        lessonId: lessonId,
        classId: this.state.classId,
        lessonName: lessonName
      }
    });
  }

  handleStudentClick(studentId, firstName, lastName) {
    this.context.router.push({
      pathname: '/class/' + this.state.classId + '/students/' + studentId,
      state: { 
        className: this.state.className,
        classId: this.state.classId,
        studentId: studentId,
        firstName: firstName,
        lastName: lastName
      }
    });
  }

  addLesson(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newLessonName.trim()){
      var newLessonName = this.state.newLessonName.trim();
      var lessonsCopy = this.state.classLessons.slice();
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
           lessonsCopy.push(response);

            this.setState({
              newLessonName: '',
              error: false,
              isLoading: false,
            });
          });

          // Fetch new class data
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
             studentError: 'Student not found',
             isLoading: false
           });
          console.log(this.state.studentError);
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
             var studentsCopy = this.state.classStudents.slice();
             studentsCopy.push(response);
              this.setState({
                newStudent: '',
                studentError: false,
                isLoading: false
              });

              // Fetch student stats again
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
          });
        } else if (response.status === 500) {
          console.log("SERVER ERROR: FAILED TO ADD STUDENT");   
          this.setState({
            studentError: "Failed to add student",
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
      <div className='dataTable'>
        <StudentTable students={props.students} handleStudentClick={props.handleStudentClick} />
        <div className='addNew'>
          <h5 className='sectionHeading' >Add Student</h5>
          <div>
            <form onSubmit={props.addStudent}>
              <input type='text' placeholder='Student Email' value={props.newStudent} onChange={(event) => {
                props.changeNewStudent(event.target.value);
              }} />
              
              <div>
                <button style={{marginLeft:'0', fontSize: '1em'}} type='submit'>Add</button>
              </div>
            </form>
            {props.children}
          </div>
        </div>
      </div>
    )
  } else {
    return (<div></div>);
  }
}

const StudentError = (props) => {
  if (props.studentError) {
    return (<div> {props.studentError} </div>)
  } else {
    return (<div></div>)
  }
}

const Lessons = (props) => {
  if(props.display) {
    return (
      <div className='dataTable'>
        <LessonTable lessons={props.lessons} handleLessonClick={props.handleLessonClick} />
        <div className='addNew'>
          <h5 className='sectionHeading' >Add Lesson</h5>
          <div>
            <form onSubmit={props.addLesson}>
              <input placeholder='Lesson Name' style={{maxWidth: '200px'}} type='text' value={props.newLessonName} onChange={(event) => {
                props.changeNewLessonName(event.target.value);
              }} />
                <DatePicker minDate={moment()} selected={props.newLessonDate} onChange={(date) => {
                  props.changeDate(date);
                }} />
                <button style={{fontSize: '1em'}} type='submit'>Add</button>
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
    <div className='tableContainer'>
      <table className='highlight'>
        <thead>
          <tr>
            <th> Lesson </th>
            <th> Date </th>
            <th> Attendance </th>
            <th> Count of Polls </th>
            <th> M.C. Accuracy </th>
            <th> Average Thumb </th>
          </tr>
        </thead>
        <tbody>
        {props.lessons.map((lesson) => {
          var correctRate = (lesson.correct_response_count || 0) / lesson.potential_correct_responses_count * 100;
          var date = new Date(lesson.date).toLocaleDateString();
          return (
            <tr style={{cursor: 'pointer'}} key={'L' + lesson.lesson_id} 
              onClick={props.handleLessonClick.bind(null, lesson.lesson_id, lesson.lesson_name)}>
              <td> {lesson.lesson_name} </td>
              <td> {date} </td>
              <td> {lesson.student_count || 0} </td>
              <td> {lesson.poll_count || 0} </td>
              <td> {!isNaN(correctRate) ? correctRate.toFixed(2) + '%' : 'N/A'} </td>
              <td> {lesson.average_thumb ? lesson.average_thumb.toFixed(2) + '%' : 'N/A'} </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
  )
}

const StudentTable = (props) => {
  return (
    <div className='tableContainer'>
      <table className='highlight'>
        <thead style={{maxWidth:'10em'}}>
          <tr>
            <th> Name </th>
            <th> Lessons Attended </th>
            <th> Response Rate </th>
            <th> M.C. Accuracy </th>
            <th> Average Thumb </th>
          </tr>
        </thead>
        <tbody>
        {props.students.map((student) => {
          var responseRate = (student.response_count || 0) / student.potential_response_count * 100;
          var correctRate = (student.correct_response_count || 0) / student.potential_correct_response_count * 100;
          return (
            <tr style={{cursor: 'pointer'}} onClick={props.handleStudentClick.bind(null, student.student_id, student.first_name, student.last_name)}
              key={'S' + student.student_id}>
              <td> {student.first_name + ' ' + student.last_name} </td>
              <td> {student.lesson_count ? student.lesson_count : 0} </td>
              <td> {!isNaN(responseRate) ? responseRate.toFixed(2) + '%' : 'N/A'} </td>
              <td> {!isNaN(correctRate) ? correctRate.toFixed(2) + '%' : 'N/A'} </td>
              <td> {student.average_thumb ? student.average_thumb.toFixed(2) + '%' : 'N/A' } </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
  )
}

ClassData.contextTypes = {
  router: React.PropTypes.any.isRequired
};

module.exports = ClassData;