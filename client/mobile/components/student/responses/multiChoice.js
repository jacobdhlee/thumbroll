var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

class ToggleButton extends React.Component {
  loggedAnswer(log) {
    console.log(log)
  }
  render() {
    return (
      <TouchableHighlight underlayColor='#FF0000' style={styles.button} onPress={this.loggedAnswer.bind(this, this.props.lable)}>
        <Text>{this.props.lable}</Text>
      </TouchableHighlight>
    )
  }
}

class MultiChoice extends React.Component {
  constructor (props){
    super(props)
  }
  
  previousPage() {
    this.props.navigator.pop();
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
        <ToggleButton lable="A" />
        <ToggleButton lable="B" />
        <ToggleButton lable="C" />
        <ToggleButton lable="D" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  halfHeight: {
    flex: .1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3366'
  },
  halfHeight1: {
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
