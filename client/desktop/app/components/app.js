import React from 'react'
import Login from './login'
import Signup from './signup'
import Classes from './teacher/classes/Classes'
import Lessons from './teacher/classes/lessons/Lessons'
import LessonsData from './teacher/classes/lessons/lessonData'
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
      ]
    };
  }

  //events here

  render(){
    return (

      <div>
        <h1>Thumbroll</h1>
        <Nav />
        <Classes teacherData={this.state.classes}/>
        <div>
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

var Nav = () => (
  <nav className="navbar">
    <div>
      <li style={{cursor: 'default'}}>Settings</li>
    </div>
  </nav>
);

module.exports = App;