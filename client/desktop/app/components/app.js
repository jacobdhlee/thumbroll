import React from 'react'
import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/lessons/Lessons'
import LessonsData from './teacher/classes/lessons/lessonData'
import Students from './teacher/classes/students/studentData'
import Settings from './Settings'

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
      display: ['home']
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
    var currentDisplay = this.state.display.slice();
    currentDisplay.unshift(newDisplay);
    this.setState({
      display: currentDisplay
    });
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
          <h1 onClick={this.manipulateDisplays.bind(this, 'home')}>Thumbroll</h1>
          <Nav goHome={this.manipulateDisplays.bind(this, 'home')} displaySetting={this.state.displayTeacherSettings} listener={this.showSettings.bind(this)}/>
        </div>
        <button style={this.state.display.length > 1 ? {} : {display:'none'}} onClick={this.goBack.bind(this)}>Go back</button>

        <div className='body'>
          <Classes goBack={this.goBack.bind(this)} displayListener={this.manipulateDisplays.bind(this)} display={this.state.display} teacherData={this.state.classes}/>
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
      <Settings display={props.displaySetting}/>
    </div>
  </nav>
  </div>
)};

module.exports = App;