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
    var userId = this.state.user.uid
    console.log('sueradsfasadfasfdas >>>>>>>>>', userId)
    var that =  this;
    api.getStudentClasses(userId)
    .then(function(resp){
      console.log('resp>>>>>>>>>>>>>>>>>>dsafdksjafhdal>>>>>>>>>', resp)
      if(resp.status === 500) {
        console.error('Error for getting class data')
      } else if(resp.status === 200) {
        // { _bodyInit: '[{"id":1,"student_id":1,"class_id":2,"class":{"id":2,"name":"CS101","teacher_id":1}}]',
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
    this.socket.emit('studentConnect', {user: this.state.user, classId: cls.id});

    this.props.navigator.push({
      component: ClassStandbyView,
      class: cls,
      user: this.state.user,
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
        <View key={index}>
          <Button onPress={this.selectedClass.bind(this, cls)} text={cls.name} />
        </View>
      )
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavBar navi={this.props.navigator}>Enrollled Classes</NavBar>
        <ScrollView>
          <View style={styles.container}>
            <Button onPress={this.selectQuickClass.bind(this)} text={'Join Quick Class'}/>
            {this.eachClasses(this.state.enrolledClasses)}
          </View>
        </ScrollView>
        

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
  container: {
    flex:1,
    alignItems: 'center',
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
