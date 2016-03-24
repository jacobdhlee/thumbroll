import React from 'react'

class StudentData extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      students: ['Students list goes here from the DB']
      classId: 'put in from the URL param'
    };
  }

  render(){
    return (
      <div>
        <li><Link to={`/classes/${this.state.classId}/lessons`}>{specificClass.key}</Link></li>
        <ul>
          {this.state.students.map((studentName) => {
            return (<li style={{cursor: 'default'}} key={studentName}>
            <Link to={`/classes/${this.state.classId}/students/${studentName}`}>{studentName}</Link>
            </li>)
          })}
        </ul>
      </div>
    )
  }

  componentWillMount(){
    //pull all students from the DB based on the classId given in the URL param
    //set the classId to the state as well
  }
}

module.exports = StudentData;