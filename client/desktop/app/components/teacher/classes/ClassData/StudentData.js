import React from 'react'
import {Route, RouteHandler, Link} from 'react-router'
import api from '../../../../utils/api';

class StudentData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: this.props.location.state.firstName,
      lastName: this.props.location.state.lastName,
      studentId: this.props.params.studentId,
      className: this.props.location.state.className,
      classId: this.props.location.state.classId,
      data: []
    };
  }

  render(){
    return (
      <div>
        <h2 className='sectionHeading classList' onClick={this.handleClassClick.bind(this)}>
          <span className='pointer'>{this.state.className}</span>
        </h2>
        <h5 className='sectionHeading classList'> {this.state.firstName + ' ' + this.state.lastName} </h5>
        <div className='dataTable'>
        <DataTable data={this.state.data} />
        </div>
      </div>
    )
  }

  componentWillMount(){
    api.getStudentPollsData(this.state.classId, this.state.studentId)
    .then((response) => {
      response.json().then((response) => {
        console.log('Individual student data from DB:', response);
        this.setState({
          data: response
        });
      }).catch((err) => {
        console.error(err);
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  handleClassClick() {
    this.context.router.push({
      pathname: '/class/' + this.state.classId + '/lessons/',
    });
  }
}



const DataTable = (props) => {
  return (
    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th> Lesson </th>
            <th> Poll </th>
            <th> Poll Type </th>
            <th> Correct Answer </th>
            <th> Student Response </th>
          </tr>
        </thead>
        <tbody>
        {props.data.map((poll) => {
          return (
            <tr key={'P' + poll.poll_id} >
              <td> {poll.lesson_name ? poll.lesson_name : 'N/A'} </td>
              <td> {poll.poll_name ? poll.poll_name : 'N/A'} </td>
              <td> {poll.type} </td>
              <td> {poll.correct_answer ? poll.correct_answer : 'N/A'} </td>
              <td> {poll.type == 'thumbs' ? poll.student_answer + '%' :  poll.student_answer} </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
  )
}

StudentData.contextTypes = {
  router: React.PropTypes.any.isRequired
};

module.exports = StudentData;