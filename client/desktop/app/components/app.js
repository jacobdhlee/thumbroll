import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router'
import {Button, Icon, Footer, Navbar} from 'react-materialize';

import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/ClassData/ClassData'
import LessonsData from './teacher/classes/ClassData/LessonData'
import Students from './teacher/classes/ClassData/StudentData'
import Profile from './Profile'
import auth from './../utils/auth'

class App extends React.Component {

  componentWillMount() {
    //check if logged in;
    auth.checkForSession((loggedIn) => {
      if(loggedIn) {
        //set state with userID
      }
    });
  }

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
    };
  }

  loadTeacherData(teacherObject){
    this.setState({
      classes: teacherObject.classes
    });
  }

  render(){
    return (
      <div style={{
        backgroundColor: 'white'
      }}>
      <Navbar className='navbar fixed'>
        <div className='nav-wrapper'>
        <Link style={
          {
            color: '#03A9F4',
            fontSize: '1em'
          }} to={`/`}>Thumbroll
        </Link>
        <Link className='large material-icons' style={
              {
                color: '#03A9F4',
              }}
              to={`/profile`}>settings
        </Link>
        </div>
      </Navbar>
        <div>
        </div>

        <div className='body'>

          {this.props.children}

        </div>

        <div style={{
          marginBottom: window.innerHeight,
          paddingBottom: window.innerHeight
        }}>
          &copy; 2016 Thumbroll
        </div>
      </div>
    );
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


module.exports = App;


