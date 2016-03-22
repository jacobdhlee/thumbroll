import React from 'react'
import Lessons from './lessons/Lessons'


class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      classes : this.props.teacherData.map((specificClass) => {
        return <li style={{cursor: 'pointer'}} onClickCapture={(event) => this.setState({currentClass: event.target.innerText})} key={specificClass.name}>{specificClass.name}</li>
      }),
      newClassName : '',
      currentClass: ''
    };
  }

  render(){
    return (
      <div>
        <h2>Classes</h2>
        <div>
          <input type='text' onChange={(event) => this.setState({newClassName: event.target.value})} />
          <button onClick={this.addClass.bind(this)}>Add new class</button>
        </div>
        {this.state.classes}
        <div>
          <Lessons className={this.state.currentClass}/>
        </div>
      </div>
    );
  }

  addClass(){
    // update state
    var classesCopy = this.state.classes.slice();
    classesCopy.push(<li 
      style={{cursor: 'pointer'}} 
      onClickCapture={(event) => this.setState({currentClass: event.target.innerText})} 
      key={this.state.newClassName}>
      {this.state.newClassName}
    </li>);

    this.setState({
      classes: classesCopy
    });

    // post to DB with teacher associated
  }

  showClass(){

  }


}

module.exports = Classes;