var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = React;

class Button extends React.Component {
  
  render () {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttons} onPress={this.props.onPress}>
          <Text style={styles.textSize}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  buttons: {
    height: 50,
    width: 340,
    backgroundColor:'#03a9f4',
    borderColor: '#03a9f4',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSize: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'white'
  },
  
})

module.exports = Button;