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
      userId: this.props.route.userId,
      pollInfo: this.props.route.pollInfo,
      pageActive: true
    }
    this.state.socket.on('closePoll', function(data) {
      if(this.state.pageActive) {
        this.setState({
          pageActive: false
        });
        this.props.navigator.pop();
      }
    }.bind(this));
  }  

  submitAnswer(answer) {
    console.log('Student',this.state.userId,'answered',answer,'to poll',this.state.pollInfo.pollId);
    // send socket with answer
    this.setState({
      pageActive: false
    });
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
