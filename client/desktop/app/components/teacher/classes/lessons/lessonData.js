import React from 'react'

class LessonData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      // state here
      // lessons data
      // polls
      newPollSelected: false
    };
  }

  render(){
    return <div>
      <h2>{this.props.className}</h2>
      <p style={this.props.className === '' ? {display:'none'} : {}}>Polls for {this.props.className}</p>
      <li style={this.props.className === '' ? {display:'none'} : {}}>January 1, 1970</li>
      <li style={this.props.className === '' ? {display:'none'} : {}}>March 31, 2034</li>

      <p style={this.props.className === '' ? {display:'none'} : {}}>Students in {this.props.className}</p>
      <li style={this.props.className === '' ? {display:'none'} : {}}>Little Bobby Tables</li>
      <li style={this.props.className === '' ? {display:'none'} : {}}>Suzie CSS</li>
      <li style={this.props.className === '' ? {display:'none'} : {}}>Edison</li>
      <AddPoll newPollSelected={this.state.newPollSelected}/>
    </div>
  }


}

const AddPoll = () => {
  // add to state

  // post to DB
  
  return (
    <div>
      <h2>Add new poll</h2>
      <button>Thumbs Check</button>
      <button>Multiple Choice</button>
    </div>
  )
};


module.exports = LessonData;