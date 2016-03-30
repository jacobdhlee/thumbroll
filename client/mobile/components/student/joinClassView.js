var React = require('react-native');
var ClassStandbyView = require('./classStandbyView.js');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var NavBar = require('./../shared/navbar');
var Button = require('./../shared/button');
var env = require('./../../utils/environment');
var api = require('./../../utils/api');

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
  ScrollView,
} = React;


class JoinClassView extends React.Component {
  constructor(props){
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {
      enrolledClasses: [],
      user: this.props.route.user,
      secretCode: '',
      height: height,
      width: width,
      modalVisible: false
    }
  }

  componentWillMount() {
    var userId = this.state.user.uid;
    var that =  this;
    api.getStudentClasses(userId)
    .then(function(resp){
      if(resp.status === 500) {
        console.error('Error for getting class data')
      } else if(resp.status === 200) {
        var classes = JSON.parse(resp._bodyInit);
        that.setState({
          enrolledClasses: classes,
        })
      }
    })
    .catch(function(err){
      console.error(err);
    })
  }

  selectedClass(cls) {
    //perhaps pass class as part of url to socket
    this.socket = io(server, {jsonp: false});
    this.socket.emit('studentConnect', {user: this.state.user, classId: cls.class.id});

    this.props.navigator.push({
      component: ClassStandbyView,
      class: cls,
      user: this.state.user,
      socket: this.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
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
    var classCode = 'qc' + this.state.secretCode;
    this.setState({
      modalVisible: false
    });
    //assuming code is valid:
    this.socket = io(server, {jsonp: false});
    this.socket.emit('studentQuickClassConnect', {user: this.state.user, classId: classCode});
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
      user: this.state.user,
      socket: this.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      }
    });
  }

  handleModalCancel() {
    this.setState({
      secretCode: '',
      modalVisible: false,
    });
  }

  eachClasses(classes){
    return classes.map((cls, index) => {
      return (
        <View key={index}>
          <Button onPress={this.selectedClass.bind(this, cls)} text={cls.class.name} />
        </View>
      )
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavBar navi={this.props.navigator}>Enrollled Classes</NavBar>
        <View style={styles.container}>
          <View>
            <ScrollView>
              <View style={styles.container}>
                <Button onPress={this.selectQuickClass.bind(this)} text={'Join Quick Class'}/>
                {this.eachClasses(this.state.enrolledClasses)}
              </View>
            </ScrollView>
          </View>
        </View>
        

        <Modal visible={this.state.modalVisible} transparent={true} animated={false}>
          <View style={styles.modal}>
            <View style={{height:this.state.height * 0.7, width:this.state.width * 0.9}}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTextSize}> Enter the secret code </Text>
                <View>
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
                </View>
              </View>
              <Button onPress={this.handleModalSubmit.bind(this)} text={'Enter'} />
              <Button onPress={this.handleModalCancel.bind(this)} text={'Cancel'} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',  
    justifyContent: 'center',
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
    backgroundColor: '#e3f2fd'
  },
  modalTextSize: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInput: {
    backgroundColor: '#e1f5fe',
    width: 300,
    height: 45,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
})
module.exports = JoinClassView;
