import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import App from './components/app';
import Login from './components/login'
import Signup from './components/signup'
import Classes from './components/teacher/classes/Classes'
import Lessons from './components/teacher/classes/ClassData/ClassData'
import LessonsData from './components/teacher/classes/ClassData/LessonData'
import Students from './components/teacher/classes/students/StudentData'
import Settings from './components/Settings'



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component = {App}>
      <IndexRoute component = {Classes} />
        <Route path='class/:classId/lessons' component={Lessons} />
        <Route path='class/:classId/lessons/:lessonId' component={LessonsData}/>
        <Route path='class/:classId/students/:studentId' component={Students}/>
      </Route>
  </Router>
), document.getElementById("app"));