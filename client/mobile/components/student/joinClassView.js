var React = require('react-native');
var ClassStandbyView = require('./classStandbyView.js');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var NavBar = require('./../shared/navbar');
var env = require('./../../utils/environment');

var server = env.server + ':' + env.port;
import NavigationBar from 'react-native-navigation-bar';

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

//textAlign enum('auto', 'left', 'right', 'center', 'justify')


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
    this.socket.emit('studentQuickClassConnect', {userId: this.state.userId, classId: code});
    this.setState({
      secretCode: ''
    });
    var classObj = {
      id: classCode,
      name: 'Quick Class: ' + classCode 
    };
    this.props.navigator.push({
      component: ClassStandbyView,
      class: classObj,
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
          <Button onPress={this.selectedClass.bind(this, cls)}>
            <Text>{cls.name}</Text>
          </Button>
        </View>
      )
    })
  }

  previousPage() {
    this.props.navigator.pop();
  }

  logout(){
    this.props.navigator.popToTop();
  }

  render() {
    return (
      <View>
        <View>
          <NavBar onBack={this.previousPage.bind(this)} onOut={this.logout.bind(this)}>Enrollled Classes</NavBar>
        </View>
        <View>
          <Button onPress={this.selectQuickClass.bind(this)}>
            <Text style={styles.buttonText}> Join Quick Class </Text>
          </Button>
          {this.eachClasses(this.state.enrolledClasses)}
        </View>
        

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
  nav: {
    flex: 0.2,
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#59CA7C',
  },
  textHeader: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    height: 70,
    width: 300,
    backgroundColor:'#6FC3D1',
    borderColor: '#6FC3D1',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textSize: {
    fontSize: 20
  },
  buttonsContainer: {
    padding: 20
  },
  buttonContainer: {
    backgroundColor:'#59AF70',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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