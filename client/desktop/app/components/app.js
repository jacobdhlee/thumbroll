import React from 'react'
import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/lessons/lessonData'
import Students from './teacher/classes/students/studentData'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [
        {
          id: {
            type: 1,
          },
          name: 'CS201'
        },
        {
          id: {
            type: 1,
          },
          name: 'CS101'
        },
      ]
    };
  }

  //events here

  render(){
    return (
      <div>
        <h1>Thumbroll</h1>
        <Classes teacherData={this.state.classes}/>
      </div>
    );
  }

  componentWillMount(){
    //fetch classes from the DB and update the state to be passed down to Classes
  }
}

module.exports = App;