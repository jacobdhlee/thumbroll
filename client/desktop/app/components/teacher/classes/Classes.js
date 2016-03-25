import React from 'react'
import ClassData from './ClassData/ClassData'
import {Route, RouteHandler, Link, Navigation} from 'react-router'
import api from '../../../utils/api';
import auth from '../../../utils/auth';

class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      // TODO: REMOVE HARDCODED DATA
      uid: 1,
      classes : [],
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
          return (<li style={{cursor: 'default'}} key={"class:"+specificClass.id}>
            <Link to={`class/${specificClass.id}/lessons`}>{specificClass.name}</Link>
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
    auth.checkForSession((user) => {
      if(!user) {
        this.transitionTo('/login');
        return;
      }
      user = user.split('_')[1];
      this.setState({
        uid: user
      });
      api.getClasses(this.state.uid)
      .then((response) => {
        if(response.status === 400){
          this.setState({
             error: 'No classes found',
             isLoading: false
           });
          console.log(this.state.error);
        } else if (response.status === 200) {
          response.json().then((response) => {
            console.log("RESPONSE = ", response);   
            this.setState({
              classes: response,
              error: false,
              isLoading: false
            });

          });
        }
      })
    })
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