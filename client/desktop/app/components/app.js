import React from 'react'
import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/classesView'
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
    return (<div>Welcome to Thumbroll!</div>);
  }
}

module.exports = App;