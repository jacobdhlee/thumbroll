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
    this.state = {
      socket: this.props.route.socket,
      user: this.props.route.user,
      pollInfo: this.props.route.pollInfo,
    }
    this.state.socket.on('closePoll', function(data) {
      this.state.socket.removeListener('closePoll');
      this.props.navigator.pop();
    }.bind(this));
  }  

  submitAnswer(answer) {
    console.log('Student',this.state.userId,'answered',answer,'to poll',this.state.pollInfo.pollId);
    this.state.socket.emit('studentResponse', {
      user: this.state.user,
      answer: answer,
      pollId: this.state.pollInfo.pollId
    })
    this.state.socket.removeListener('closePoll');
    this.props.navigator.pop();
  }

  onBack() {
    this.state.socket.removeListener('closePoll');
    this.props.navigator.pop();
  }

  beforeLogout() {
    this.state.socket.emit('studentLoggingOut', {user:this.state.user});
  }

  renderButton(value) {
    return (
      <Button onPress={this.submitAnswer.bind(this, value)} text={value} />
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavBar navi={this.props.navigator} beforeLogout={this.beforeLogout.bind(this)} onBack={this.onBack.bind(this)}>
          MultiChoice
        </NavBar>
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
