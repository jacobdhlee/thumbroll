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
  TouchableHighlight,
  Modal,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Navigator,
} = React;

class JoinClassView extends React.Component {
  constructor(props){
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {
      enrolledClasses: [{id: 1, name:'Quick Class'}, {id:2, name:'CS 101'}, {id:3, name: 'CS 201'}],
      userId: this.props.route.userId,
      secretCode: '',
      height: height,
      width: width,
      modalVisible: false
    }
  }

  selectedClass(cls) {
    //perhaps pass class as part of url to socket
    this.socket = io(server, {jsonp: false});
    this.socket.emit('studentConnect', {userId: this.state.userId, classId: cls.id});

    this.props.navigator.push({
      component: ClassStandbyView,
      class: cls,
      userId: this.state.userId,
      socket: this.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    });
  }

  selectQuickClass() {
    this.setState({
      modalVisible: true
    })
  }

  handleCodeChange(event) {
    this.setState({
      secretCode: event.nativeEvent.text
    });
  }

  handleModalSubmit() {
    var code = this.state.secretCode;
    this.setState({
      modalVisible: false
    });
    //assuming code is valid:
    this.socket = io(server, {jsonp: false});
    this.socket.emit('studentQuickClassConnect', {userId: this.state.userId, classId: 'qc' + code});
    this.setState({
      secretCode: ''
    });
    this.props.navigator.push({
      component: ClassStandbyView,
      class: code,
      userId: this.state.userId,
      socket: this.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    });
  }

  handleModalCancel() {
    this.setState({
      secretCode: '',
      modalVisible: false
    });
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

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.selectQuickClass.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}> Join Quick Class </Text>
          </TouchableOpacity>
        </View>

        {this.eachClasses(this.state.enrolledClasses)}

        <Modal visible={this.state.modalVisible} transparent={true} animated={true}>
          <View style={styles.modal}>
            <View style={{height:this.state.height * 0.6, width:this.state.width * 0.8}}>
              <View style={styles.modalBox}>
                <Text> Enter the secret code from your lecturer: </Text>
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  maxLength={4}
                  style={styles.userInput}
                  keyboardType='numeric'
                  value={this.state.secretCode}
                  returnKeyType={'done'}
                  onChange={this.handleCodeChange.bind(this)}
                  onSubmitEditing={this.handleModalSubmit.bind(this)}
                />
                <TouchableHighlight onPress={this.handleModalSubmit.bind(this)}>
                  <Text> Enter </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleModalCancel.bind(this)}>
                  <Text> Cancel </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

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
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userInput: {
    height: 50,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
})
module.exports = JoinClassView;