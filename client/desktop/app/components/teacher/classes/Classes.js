import React from 'react'
import ClassData from './ClassData/ClassData'
import {Route, RouteHandler, Link} from 'react-router'
import api from '../../../utils/api';

class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {

      classes : ['1','2','3'],
      lessons: [],
      newClassName : '',
      currentClass: '',
      currentStudent: ''
    };
  }

  render(){
    return (
      <div>
        <h2>Classes</h2>
        {this.state.classes.map((specificClass) => {
          return (<li style={{cursor: 'default'}} key={specificClass}>
            <Link to={`class/${specificClass}/lessons`}>{specificClass}</Link>
            </li>)
         })
        }

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

        <LessonsToday lessons={this.state.lessons}/>
      <div>
        {this.props.children}
      </div>
    </div>
    );
  }

  addClass(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newClassName.trim()){
      var classesCopy = this.state.classes.slice();
      classesCopy.push(this.state.newClassName);

      this.setState({
        classes: classesCopy,
        newClassName: ''
      });
    }

    // post to DB with teacher associated
  }

  componentWillMount(){
    this.setState({
      classes: [1,2,3], //api.getClassData()
      lessons: [{
        id: 4,
        name: 'Pirates',
        classId: 1
      }] //array of lesson objects for today from the DB
    });
  }

}

const LessonsToday = (props) => {
  if(!props.lessons) {
    return (
      <div>
        <h2>Today's Lessons</h2>
        <p>There are no lessons today</p>
      </div>
    )
  }
  return(
    <div>
      <h2>Today's Lessons</h2>
      <ul>
        {props.lessons.map((lesson) => {
          return (<li style={{cursor: 'default'}} key={lesson.name}>
            <Link to={`class/${lesson.classId}/lessons/${lesson.id}`}>{lesson.name}</Link>
            </li>)
         })}
      </ul>
    </div>
  )
}

module.exports = Classes;