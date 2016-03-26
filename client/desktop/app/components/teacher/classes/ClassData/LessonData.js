import React from 'react'

class LessonData extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.location)
    this.state = {
      lessonId: this.props.params.lessonId,
      lessonName: this.props.location.state.lessonName,
      className: this.props.location.state.className,
      polls: ['get this from the DB query']
    };
  }

  render(){
    return (<div>
      <h3 style={{color: '#03A9F4'}}>{this.state.className}</h3>
      <h5 style={{color: '#03A9F4'}}>Lesson: {this.state.lessonName}</h5>
      <p>Polls for {this.state.className}</p>
      <button>Add thumbs check</button>
      <button>Add multiple choice</button>
      
    </div>)
  }

  componentWillMount(){
    //get the poll responses from the lessonId given in the URL param
    //set the className from the DB query
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


module.exports = LessonData;