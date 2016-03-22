import React from 'react'

class LessonData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      // state here
  
      // polls
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
      <AddPoll hide={!this.props.className}/>
    </div>
  }


}

const AddPoll = (hide) => {
  // add to state

  // post to DB

  return (
    <div>
      <h2 style={hide === true ? {display:'none'} : {}}>Add new poll</h2>
      <button style={hide === true ? {display:'none'} : {}}>Thumbs Check</button>
      <button style={hide === true ? {display:'none'} : {}}>Multiple Choice</button>
    </div>
  )
};


module.exports = LessonData;