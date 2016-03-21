import React from 'react'
import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/lessons/lessonData'
import Students from './teacher/classes/students/studentData'

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //   };
  // }

  //events here

  render(){
    return (
      <div>
        <h1>Thumbroll</h1>
        <Classes />
      </div>
    );
  }
}

module.exports = App;