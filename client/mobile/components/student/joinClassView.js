var React = require('react-native');
var ClassStandbyView = require('./classStandbyView.js');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var env = require('./../../utils/environment');
var server = env.server + ':' + env.port;

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Navigator,
} = React;

class JoinClassView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      enrolledClasses: [{id: 1, name:'Quick Class'}, {id:2, name:'CS 101'}, {id:3, name: 'CS 201'}],
      userId: this.props.route.userId
    }
  }

  selectedClass(cls) {
    //perhaps pass class as part of url to socket
    this.socket = io(server, {jsonp: false});
    this.socket.emit('studentConnect', {userId: this.state.userId, classId: cls.id});

    this.props.navigator.push({
      component: ClassStandbyView,
      className: cls.name,
      userId: this.state.userId,
      socket: this.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }

  eachClasses(classes){
    return classes.map((cls, index) => {
      return (
        <View style={styles.buttonsContainer} key={index}>
          <TouchableOpacity onPress={this.selectedClass.bind(this, cls)}style={styles.buttonContainer}>
            <Text>{cls.name}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}>
        <View style={styles.textHeader}>
          <Text style={styles.textSize}>Enrollled Classes</Text>
        </View>
        {this.eachClasses(this.state.enrolledClasses)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textSize: {
    fontSize: 20
  },
  buttonsContainer: {
    padding: 20
  },
  buttonContainer: {
    margin: 20
  },
})
module.exports = JoinClassView;