var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = React;


class NavBar extends React.Component {
  render () {
    return (
      <View style={styles.nav}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.textSize}>Back</Text>
        </TouchableOpacity>
         <View>
          <Text style={styles.textSize}>{this.props.children}</Text>
        </View>
         <TouchableOpacity onPress={this.props.onOut}>
          <Text style={styles.textSize}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  nav: {
    flex: 0.2,
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#59CA7C',
  },
  textSize: {
    fontSize: 15
  },
})

module.exports = NavBar;