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
import Settings from './Settings'
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
      displayTeacherSettings: false,
    };
  }

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
          <h1>
            <Link style={
              {
                color: '#03A9F4',
                fontSize: '1em'
              }} to={`/`}>Thumbroll
            </Link>
          </h1>
          <Navbar right>
            <Settings displayListener={this.showSettings} display={true}/>
          </Navbar>
        </div>

        <div className='body'>

          {this.props.children}

        </div>

        <Footer copyrights="&copy; 2016 Thumbroll">
        </Footer>
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


