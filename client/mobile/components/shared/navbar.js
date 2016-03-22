var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = React;


class NavBar extends React.Component {
  constructor(props){
    super(props);
  }

  logout(){
    //socker closed
    // this.state.socket.emit('studentLeavingClass', {userId: this.state.userId, classId:this.state.class.id});
    this.props.navi.popToTop();
  }
  render () {
    return (
      <View style={styles.nav}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.textSize}>Back</Text>
        </TouchableOpacity>
         <View>
          <Text style={styles.textSizeOne}>{this.props.children}</Text>
        </View>
         <TouchableOpacity onPress={this.logout.bind(this)}>
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
    justifyContent: 'center',
    fontSize: 16
  },
  textSizeOne: {
    justifyContent: 'center',
    fontSize: 20
  },
})

module.exports = NavBar;