import React from 'react'
import api from '../../../../utils/api';

class LessonData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lessonId: this.props.params.lessonId,
      lessonName: this.props.location.state.lessonName,
      className: this.props.location.state.className,
      classId: this.props.location.state.classId,
      data: [],
    };
  }

  render(){
    return (<div>
      <h2 className='sectionHeading classList' onClick={this.handleClassClick.bind(this)}>
        {this.state.className}
      </h2>
      <h5 className='sectionHeading classList'>'{this.state.lessonName}'</h5>
      <div className='dataTable'>
        <ThumbsTable data={this.state.data.filter(function(poll){
          return poll.type === 'thumbs';
        })} />
      </div>
      <div className='dataTable'>
        <MCTable data={this.state.data.filter(function(poll) {
          return poll.type === 'multiChoice';
        })} />
      </div>
      <button>Add thumbs check</button>
      <button>Add multiple choice</button>
      
    </div>)
  }

  componentWillMount(){
    api.getLessonPollsData(this.state.lessonId)
    .then((response) => {
      response.json().then((response) => {
        console.log('Individual lesson data from DB:', response);
        this.setState({
          data:response
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

const MCTable = (props) => {
  if(props.data.length) {
    return (
      <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th> Multiple Choice Polls </th>
            <th> Response Count </th>
            <th> Accuracy Rate </th>
          </tr>
        </thead>
        <tbody>
        {props.data.map((poll) => {
        var correctRate = (poll.correct_response_count || 0) / poll.response_count * 100;
          return (
            <tr key={'P' + poll.poll_id} >
              <td> {poll.poll_name || 'N/A'} </td>
              <td> {poll.response_count || 0} </td>
              <td> {!isNaN(correctRate) ? correctRate.toFixed(2) + '%' : 'N/A'} </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    )
  } else {
    return (
      <div> No Multiple Choice Polls </div>
    )
  }
}

const ThumbsTable = (props) => {
  if(props.data.length) {
    return (
      <div className='tableContainer'>
       <table>
        <thead>
          <tr>
            <th> Thumbs Checks </th>
            <th> Response Count </th>
            <th> Average Response </th>
          </tr>
        </thead>
        <tbody>
        {props.data.map((poll) => {
          return (
            <tr key={'P' + poll.poll_id} >
              <td> {poll.poll_name || 'N/A'} </td>
              <td> {poll.response_count || 0} </td>
              <td> {poll.average_thumb.toFixed(2) + '%'} </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    )
  } else {
    return (
      <div> No Thumbs Check Polls </div>
    )
  }
}

const AddPoll = (hide) => {
  // add to state
  // post to DB
  return (
    <div>
      <button>Thumbs Check</button>
      <button>Multiple Choice</button>
    </div>
  )
};

LessonData.contextTypes = {
  router: React.PropTypes.any.isRequired
};

module.exports = LessonData;