import React from 'react'
import Lessons from './lessons/Lessons'


class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      classes : this.props.teacherData.map((specificClass) => {
        return <li style={{cursor: 'default'}} onClickCapture={(event) => this.setState({currentClass: event.target.innerText})} key={specificClass.name}>{specificClass.name}</li>
      }),
      newClassName : '',
      currentClass: ''
    };
  }

  render(){
    return (
      <div>
        <h2>Classes</h2>
        {this.state.classes}
        <div>
          <form onSubmit={this.addClass.bind(this)}>
            <input className='newClassForm' type='text' value={this.state.newClassName} onChange={(event) => {
              this.setState({
                newClassName: event.target.value
              });
            }} />
            <div>
              <button type='submit'>Add new class</button>
            </div>
          </form>
        </div>
        <div>
          <Lessons className={this.state.currentClass}/>
        </div>
      </div>
    );
  }

  addClass(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newClassName.trim()){
      var classesCopy = this.state.classes.slice();
      classesCopy.push(<li 
        style={{cursor: 'default'}} 
        onClickCapture={(event) => this.setState({currentClass: event.target.innerText})} 
        key={this.state.newClassName}>
        {this.state.newClassName}
      </li>);

      this.setState({
        classes: classesCopy,
        newClassName: ''
      });
    }

    // post to DB with teacher associated
  }

  showClass(){

  }


}

module.exports = Classes;