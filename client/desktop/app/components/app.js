import React from 'react'
import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/ClassData/ClassData'
import LessonsData from './teacher/classes/ClassData/LessonData'
import Students from './teacher/classes/students/StudentData'
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
        {
          id: {
            type: 1,
          },
          name: 'HIST301'
        },
        {
          id: {
            type: 1,
          },
          name: 'CS440'
        },
        {
          id: {
            type: 1,
          },
          name: 'ENGR501'
        },
        {
          id: {
            type: 1,
          },
          name: 'AA971'
        },
      ],
      displayTeacherSettings: false,
      display: ['auth']
    };
  }

  //events here
  showSettings(event){
    var currentDisplaySetting = this.state.displayTeacherSettings;
    this.setState({
      displayTeacherSettings: !currentDisplaySetting
    });
  }

  manipulateDisplays(newDisplay){
    if(newDisplay === 'auth') {
      this.setState({
        display: ['auth'],
        displayTeacherSettings: false
      });
      //fire request to destroy
    } else {
      var currentDisplay = this.state.display.slice();

      if(currentDisplay[0] !== newDisplay){
        currentDisplay.unshift(newDisplay);
      }
      this.setState({
        display: currentDisplay
      });
    }
  }

  goBack(){
    var currentDisplayArray = this.state.display.slice();
    currentDisplayArray.shift();
    this.setState({
      display: currentDisplayArray
    });
  }

  render(){
    return (
      <div>
        
        <div className='header'>
          <h1 onClick={this.state.display[0] !== 'auth' ? this.manipulateDisplays.bind(this, 'home') : ()=>{}}>Thumbroll</h1>
          <Nav displayListener={this.manipulateDisplays.bind(this)} display={this.state.display} showSettings={this.state.displayTeacherSettings} listener={this.showSettings.bind(this)}/>
        </div>

        <Login displayListener={this.manipulateDisplays.bind(this)} display={this.state.display} />

        <button style={this.state.display[0] !== 'home' ? {} : {display:'none'}} onClick={this.goBack.bind(this)}>Go back</button>

        <div className='body'>
          <Classes displayListener={this.manipulateDisplays.bind(this)} display={this.state.display} studentData={this.state.students} classData={this.state.classes}/>
        </div>

        <div className='footer'>
          Thumbroll 2016. 
        </div>
      </div>
    );
  }

  componentWillMount(){
    //fetch classes from the DB and update the state to be passed down to Classes
  }

  componentWillMount(){
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
  if(props.display[0] !== 'auth'){ 
    return (<div>
      <nav className="navbar">
      <div>
        <li onClick={props.listener} style={{cursor: 'default'}}>Settings</li>
        <Settings displayListener={props.displayListener} display={props.showSettings}/>
      </div>
    </nav>
    </div> )
  } else {
    return (<div></div>)
  }
};

module.exports = App;