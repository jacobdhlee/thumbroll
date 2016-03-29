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
      addMultiChoice: false,
      thumbsTitle: "",
      thumbsQuestion: "",
      multiTitle: "",
      multiQuestion: "",
      multiAnswer: "",
      multiA: "",
      multiB: "",
      multiC: "",
      multiD: ""
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
        onSubmit={this.handleThumbsFormSubmit.bind(this)} 
        addThumbs={this.state.addThumbs}
        thumbsTitle={this.state.thumbsTitle}
        thumbsQuestion={this.state.thumbsQuestion}
        handleThumbsTitleChange={this.handleThumbsTitleChange.bind(this)}
        handleThumbsQuestionChange={this.handleThumbsQuestionChange.bind(this)}
      />
      <AddMultiChoiceForm 
        onSubmit={this.handleMultiChoiceFormSubmit.bind(this)}
        addMultiChoice={this.state.addMultiChoice}
        multiTitle={this.state.multiTitle}
        multiQuestion={this.state.multiQuestion}
        multiAnswer={this.state.multiAnswer}
        multiA={this.state.multiA}
        multiB={this.state.multiB}
        multiC={this.state.multiC}
        multiD={this.state.multiD}
        handleMultiTitleChange={this.handleMultiTitleChange.bind(this)}
        handleMultiQuestionChange={this.handleMultiQuestionChange.bind(this)}
        handleMultiAnswerChange={this.handleMultiAnswerChange.bind(this)}
        handleMultiAChange={this.handleMultiAChange.bind(this)}
        handleMultiBChange={this.handleMultiBChange.bind(this)}
        handleMultiCChange={this.handleMultiCChange.bind(this)}
        handleMultiDChange={this.handleMultiDChange.bind(this)}
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

  handleThumbsTitleChange(e) {
    this.setState({ thumbsTitle: e.target.value });
  }

  handleThumbsQuestionChange(e) {
    this.setState({ thumbsQuestion: e.target.value });
  }
  
  handleMultiTitleChange(e) {
    this.setState({ multiTitle: e.target.value });
  }

  handleMultiQuestionChange(e) {
    this.setState({ multiQuestion: e.target.value });
  }

  handleMultiAnswerChange(e) {
    this.setState({ multiAnswer: e.target.value });
  }

  handleMultiAChange(e) {
    this.setState({ multiA: e.target.value });
  }

  handleMultiBChange(e) {
    this.setState({ multiB: e.target.value });
  }

  handleMultiCChange(e) {
    this.setState({ multiC: e.target.value });
  }

  handleMultiDChange(e) {
    this.setState({ multiD: e.target.value });
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
  if (props.addThumbs) {
    return (
      <div>
        <h5 className='sectionHeading' >New Thumbs Check</h5>
        <form onSubmit={props.addStudent}>
          <input type='text' placeholder='Title (for your records)' value={props.thumbsTitle} onChange={(event) => {
            props.handleThumbsTitleChange(event);
          }} />
          <input type='text' placeholder='Question' value={props.thumbsQuestion} onChange={(event) => {
            props.handleThumbsQuestionChange(event);
          }} />
          
          <div>
            <button style={{marginLeft:'0', fontSize: '1em'}} type='submit'>Add</button>
          </div>
        </form>
      </div>
    )  
  } else {
    return (
      <div></div>
      )
  }
};

const AddMultiChoiceForm = (props) => {
  if (props.addMultiChoice) {
    return (
      <div>
        <h5 className='sectionHeading' >New Multiple Choice</h5>
        <form onSubmit={props.handleMultiChoiceFormSubmit}>
          <input type='text' placeholder='Short title (for your records)' value={props.multiTitle} onChange={(event) => {
            props.handleMultiTitleChange(event);
          }} />
          <input type='text' placeholder='Question' value={props.multiQuestion} onChange={(event) => {
            props.handleMultiQuestionChange(event);
          }} />
          <input type='text' placeholder='Option A' value={props.multiA} onChange={(event) => {
            props.handleMultiAChange(event);
          }} />
          <input type='text' placeholder='Option B' value={props.multiB} onChange={(event) => {
            props.handleMultiBChange(event);
          }} />
          <input type='text' placeholder='Option C' value={props.multiC} onChange={(event) => {
            props.handleMultiCChange(event);
          }} />
          <input type='text' placeholder='Option D' value={props.multiD} onChange={(event) => {
            props.handleMultiDChange(event);
          }} />
          
          <div>
            <button style={{marginLeft:'0', fontSize: '1em'}} type='submit'>Add</button>
          </div>
        </form>
      </div>
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