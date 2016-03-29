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
      addThumbs: false,
      addMultiChoice: false
    };
  }

  render(){
    return (<div>
      <h2 className='sectionHeading classList' onClick={this.handleClassClick.bind(this)}>
        <span className='pointer'>{this.state.className}</span>
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
      <button onClick={this.handleAddThumbs.bind(this)}>Add thumbs check</button>
      <button onClick={this.handleAddMultiChoice.bind(this)}>Add multiple choice</button>

      <AddThumbsForm 
        handleFormSubmit={this.handleThumbsFormSubmit.bind(this)} 

      />
      <AddMultiChoiceForm 
        handleFormSubmit={this.handleMultiChoiceFormSubmit.bind(this)} 

      />
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

  handleAddThumbs() {
    // Pop out Thumbs form
    this.setState({
      addThumbs: true,
      addMultiChoice: false
    });
  }

  handleAddMultiChoice() {
    // Pop out MultiChoice form
    this.setState({
      addThumbs: false,
      addMultiChoice: true
    });
  }

  handleThumbsFormSubmit() {
    // Submit form data over API

    this.setState({
     // Wipe relevant states
    });

    // Call API to grab new poll data
    // add to state
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

  handleMultiChoiceFormSubmit() {
    // Submit form data over API

    this.setState({
     // Wipe relevant states
    });

    // Call API to grab new poll data
    // add to state
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

const AddThumbsForm = (props) => {
  if (this.props.addThumbs) {
    return (
      <form onSubmit={this.handleThumbsFormSubmit}>
        <input placeholder='Class Name' className='newClassForm' type='text' value={this.state.newClassName} onChange={(event) => {
          this.setState({
            newClassName: event.target.value
          });
        }} />
        <div>
          <button style={{fontSize: '1em'}} type='submit'>Add</button>
        </div>
      </form>
    )
  } else {
    return (
      <div></div>
      )
  }
};

const AddMultiChoiceForm = (props) => {
  if (this.props.addMultiChoice) {
    return (
      <form onSubmit={this.handleMultiChoiceFormSubmit}>
        <input placeholder='Class Name' className='newClassForm' type='text' value={this.state.newClassName} onChange={(event) => {
          this.setState({
            newClassName: event.target.value
          });
        }} />
        <div>
          <button style={{fontSize: '1em'}} type='submit'>Add</button>
        </div>
      </form>
    )
  } else {
    return (
      <div></div>
      )
  }
};

LessonData.contextTypes = {
  router: React.PropTypes.any.isRequired
};

module.exports = LessonData;