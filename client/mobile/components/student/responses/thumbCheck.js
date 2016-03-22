var React = require('react-native');
var Slider = require('react-native-slider');
var ThumbRoll = require('./thumbRoll');

var {
  View,
  Text,
  StyleSheet,
  ScrollView,
} = React;

class ThumbCheck extends React.Component {
  constructor(props) {
    console.log('YO!');
    super(props)
    this.state = {
      value: 0,
      pollInfo: this.props.route.pollInfo,
      socket: this.props.route.socket,
      userId: this.props.route.userId,
    }
  }

  submitResponse() {
    console.log('Student',this.state.userId,'answered',this.state.value,'to poll',this.state.pollInfo.pollId);
    this.state.socket.emit('studentResponse', {
      userId: this.state.userId,
      answer: this.state.value,
      pollId: this.state.pollInfo.pollId
    })
    this.props.navigator.pop();
  }

  valueChange(value) {
    this.setState({value: Math.floor(value)})
  }
  
  render() {
    return (
      <View style={styles.mainDiv}>
        <View>
          <Text> Enter Percentage </Text>
        </View>
        <View style={styles.container}>
          <ThumbRoll/>
        </View>
        <View>
          <Text onPress={this.submitResponse.bind(this)}>Submit</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  mainDiv: {
    backgroundColor: '#6ECFBF',
  }
})

var customStyles = StyleSheet.create({
  track: {
      height: 4,
      borderRadius: 2,
    },
    thumb: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: 'white',
      borderColor: '#30a935',
      borderWidth: 2,
    }
})

module.exports = ThumbCheck;
