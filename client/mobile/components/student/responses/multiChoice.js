var React = require('react-native');
var NavBar = require('./../../shared/navbar');
var Button = require('./../../shared/button');

var {
  View,
  Text,
} = React;

class MultiChoice extends React.Component {
  constructor (props){
    super(props);
    this.socket = this.props.route.socket;
    this.userId = this.props.route.userId;
    this.pollInfo = this.props.route.pollInfo;

    this.socket.on('closePoll', function(data) {
      this.props.navigator.pop();
    });
  }  

  submitAnswer(answer) {
    console.log('Student',this.userId,'answered',answer,'to poll',this.pollInfo.pollId);
    // send socket with answer
    this.socket.emit('studentResponse', {
      userId: this.userId,
      answer: answer,
      pollId: this.pollInfo.pollId
    })
    this.props.navigator.pop();
    // go to previous page
  }

  renderButton(value) {
    return (
      <Button onPress={this.submitAnswer.bind(this, value)} text={value} />
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavBar navi={this.props.navigator}>MultiChoice</NavBar>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {this.renderButton("A")}
          {this.renderButton("B")}
          {this.renderButton("C")}
          {this.renderButton("D")}
        </View>
      </View>
    )
  }
}

module.exports = MultiChoice;
