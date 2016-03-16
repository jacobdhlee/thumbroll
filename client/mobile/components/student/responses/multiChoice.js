var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

// class ToggleButton extends React.Component {
//   constructor(props)
//   submitAnswer(answer) {
//     // send socket with answer
//     this.socket.emit('studentConnect', {
//       userId: this.state.userId,

//     })
//       this.props.navigator.pop();
//     // go to previous page
//   }
//   render() {
//     return (
//       <TouchableHighlight underlayColor='#FF0000' style={styles.button} onPress={this.submitAnswer.bind(this, this.props.label)}>
//         <Text>{this.props.label}</Text>
//       </TouchableHighlight>
//     )
//   }
// }

class MultiChoice extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      pollInfo: this.props.route.pollInfo,
      userId: this.props.route.userId,
      socket: this.props.route.socket
    };
  }  

  previousPage() {
    this.props.navigator.pop();
  }

  submitAnswer(answer) {
    console.log('Student',this.state.userId,'answered',answer,'to poll',this.state.pollInfo.pollId);
    // send socket with answer
    this.state.socket.emit('studentResponse', {
      userId: this.state.userId,
      answer: answer,
      pollId: this.state.pollInfo.pollId
    })
    this.props.navigator.pop();
    // go to previous page
  }

  renderButton(value) {
    return (
      <TouchableHighlight underlayColor='#FF0000' style={styles.button} onPress={this.submitAnswer.bind(this, value)}>
        <Text>{value}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfHeight1}>
          <Text onPress={this.previousPage.bind(this)}>back</Text>
        </View>
        <View style={styles.halfHeight}>
          <Text>MultiChoice</Text>
        </View>
        {this.renderButton("A")}
        {this.renderButton("B")}
        {this.renderButton("C")}
        {this.renderButton("D")}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  halfHeight1: {
    flex: .1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8A30C'
  },
  halfHeight: {
    flex: .1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3366',
  },
  button:{
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#70D1C1',
  },
})


module.exports = MultiChoice;
