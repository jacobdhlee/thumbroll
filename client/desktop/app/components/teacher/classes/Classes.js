import React from 'react'
import Lessons from './lessons/Lessons'


class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      display: this.props.display,
      displayListener: this.props.displayListener,
      classes : this.props.teacherData.map((specificClass) => {
        return (<li style={{cursor: 'default'}} onClickCapture={(event) => {
          this.setState({
            currentClass: event.target.innerText,
          });
          this.state.displayListener('lessons');
        }} key={specificClass.name}>{specificClass.name}</li>)
      }),
      newClassName : '',
      currentClass: ''
    };
  }

  checkDisplaySettings(){
    if(this.props.display !== this.state.display) {
      this.setState({
        display: this.props.display
      });
    }
  }

  render(){
    this.checkDisplaySettings();
    console.log('state: ', this.state.display, 'props', this.props.display)
    if(this.state.display === 'home'){
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
          <Lessons display={this.state.display} displayListener={this.state.displayListener.bind(this)} className={this.state.currentClass}/>
        </div>
      </div>
    );
   } else {
      return (
        <div>
          <Lessons display={this.state.display} displayListener={this.state.displayListener.bind(this)} className={this.state.currentClass}/>
        </div>
      )
    }
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