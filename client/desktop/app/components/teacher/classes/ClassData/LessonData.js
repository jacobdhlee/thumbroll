import React from 'react'

class LessonData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      lessonId: this.props.params.lessonId,
      className: 'get this from the DB query',
      polls: ['get this from the DB query']
    };
  }

  render(){
    return (<div>
      <h2>{this.state.className}</h2>
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