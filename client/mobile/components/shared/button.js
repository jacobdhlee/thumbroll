var React = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  Navigator
} = React;

class Button extends React.Component {
  
  render () {
    return (
      <TouchableOpacity style={styles.buttons} onPress={this.props.onPress}>
        <Text style={{color: 'white'}}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    height: 70,
    width: 300,
    backgroundColor:'#6FC3D1',
    borderColor: '#6FC3D1',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  textSize: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  
})

module.exports = Button;