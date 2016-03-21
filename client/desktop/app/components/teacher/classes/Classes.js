import React from 'react'

class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      classes : this.props.teacherData.map((specificClass) => {
        return <li key={specificClass.name}>{specificClass.name}</li>
      }),
      newClassName : ''
    };
  }

  render(){
    return (
      <div>
        <h1>Classes</h1>
        <div>
          <input type='text' onChange={(event) => this.setState({newClassName: event.target.value})} />
          <button onClick={this.addClass.bind(this)}>Add new class</button>
        </div>
        {this.state.classes}
      </div>
    );
  }

  addClass(){
    // update state
    var classesCopy = this.state.classes.slice();
    classesCopy.push(<li key={this.state.newClassName}>{this.state.newClassName}</li>);
    this.setState({
      classes: classesCopy
    });


    // post to DB
  }


}

module.exports = Classes;