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
  handleBackPress() {
    if(this.props.onBack) {
      this.props.onBack();
    } else {
      this.props.navi.pop();
    }
  }
  logout(){
    // this.state.socket.emit('studentLeavingClass', {userId: this.state.userId, classId:this.state.class.id});
    if(this.props.socket) {
      this.props.socket.disconnect();
    }
    this.props.navi.popToTop();
  }
  render () {
    return (
      <View>
        <View style={styles.nav}>
          <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
            <Text style={styles.textSize}>Back</Text>
          </TouchableOpacity>
           <View>
            <Text style={styles.textSizeOne}>{this.props.children}</Text>
          </View>
           <TouchableOpacity onPress={this.logout.bind(this)}>
            <Text style={styles.textSize}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  nav: {
    flex: 0.2,
    marginTop: 20,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#59CA7C',
  },
  textSize: {
    justifyContent: 'center',
    fontSize: 20
  },
  textSizeOne: {
    fontSize: 25,
    justifyContent: 'center',
  },
})

module.exports = NavBar;