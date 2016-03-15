var React = require('react-native');
var ClassStandbyView = require('./classStandbyView.js');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');

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
      enrolledClasses: ['Quick class','CS101', 'CS201']
    }
  }

  selectedClass(cls) {
    console.log(cls);
    //perhaps pass class as part of url to socket
    this.socket = io('localhost:3000', {jsonp: false});
    this.props.navigator.push({
      component: ClassStandbyView,
      className: cls,
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
            <Text>{cls}</Text>
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