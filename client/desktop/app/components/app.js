import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/ClassData/ClassData'
import LessonsData from './teacher/classes/ClassData/LessonData'
import Students from './teacher/classes/ClassData/StudentData'
import Settings from './Settings'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [
        {
          id: {
            type: 1,
          },
          firstname: 'Little Bobby',
          lastname: 'Tables',
          email: 'bobby@droptables.com',
          username: 'DROP*',
          password: 'tables'
        }
      ],
      classes: [],
      displayTeacherSettings: false,
    };
  }

  //events here

  loadTeacherData(teacherObject){
    this.setState({
      classes: teacherObject.classes
    });
  }

  showSettings(event){
    var currentDisplaySetting = this.state.displayTeacherSettings;
    this.setState({
      displayTeacherSettings: !currentDisplaySetting
    });
  }

  render(){
    return (
      <div>
        <div className='header'>
          <h1>Thumbroll</h1>
          <Nav showSettings={this.state.displayTeacherSettings} listener={this.showSettings.bind(this)}/>
        </div>

        <div className='body'>

          {this.props.children}

        </div>

        <div className='footer'>
          Thumbroll 2016. 
        </div>
      </div>
    );
  }

  componentDidMount(){
    //fetch classes from the DB and update the state to be passed down to Classes
  }

}


//////////////////////////
// FOR DEBUGGING EVENTS //
//////////////////////////

// console.shallowCloneLog = function(){
//   var typeString = Function.prototype.call.bind(Object.prototype.toString)
//   console.log.apply(console, Array.prototype.map.call(arguments, function(x){
//     switch (typeString(x).slice(8, -1)) {
//       case 'Number': case 'String': case 'Undefined': case 'Null': case 'Boolean': return x;
//       case 'Array': return x.slice();
//       default: 
//         var out = Object.create(Object.getPrototypeOf(x));
//         out.constructor = x.constructor;
//         for (var key in x) {
//           out[key] = x[key];
//         }
//         Object.defineProperty(out, 'constructor', {value: x.constructor});
//         return out;
//     }
//   }));
// }

var Nav = (props) => {
  return (<div>
    <nav className="navbar">
    <div>
      <li onClick={props.listener} style={{cursor: 'default'}}>Settings</li>
      <Settings displayListener={props.displayListener} display={props.showSettings}/>
    </div>
  </nav>
  </div> )
};

module.exports = App;