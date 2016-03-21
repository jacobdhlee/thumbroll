var React = require('react-native');
var JoinClassView = require('./../student/joinClassView');
var ClassStandbyView = require('./../student/classStandbyView');
var StartClassView = require('./../teacher/startClassView');
var RequestFeedbackView = require('./../teacher/requestFeedbackView');
var StudentQCModal = require('./../student/studentQCModal');
var TeacherQCModal = require('./../teacher/teacherQCModal');
var Signup = require('./signup');
var api = require('./../../utils/api');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var env = require('./../../utils/environment');
var server = env.server + ':' + env.port;

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator,
  Switch,
  Dimensions
} = React;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: false,
      accountType: 'student',
      switchState: false,
      modalVisible: false,
      teacherModalId: '',
      teacherModalClassId: '',
      teacherModalSocket: '',
    };
    // Check keychain for saved credentials
      // if so, move forward to next scene
      // else, all the stuff below
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  handleLoginSubmit(){
      this.setState({
        isLoading: true
      });
      
      api.login(this.state.username, this.state.password)
      .then((response) => {
        if(response.status === 400){
          this.setState({
             error: 'Username or password is incorrect',
             isLoading: false
           });
        } else if (response.status === 200) {
          var body = JSON.parse(response._bodyText);
          if(body.teacher) {
            this.props.navigator.push({
              component: StartClassView,
              classes: body.teacher.classes,
              sceneConfig: {
                ...Navigator.SceneConfigs.FloatFromBottom,
                gestures: {}
              }
            });
          } else if (body.student) {
            this.props.navigator.push({
              component: JoinClassView,
              classes: body.student.classes,
              userId: body.student.uid,
              sceneConfig: {
                ...Navigator.SceneConfigs.FloatFromBottom,
                gestures: {}
              }
            });
          }
        }
      })
      .catch((err) => {
        this.setState({
           error: 'User not found' + err,
           isLoading: false
         });
      });
      this.setState({
        isLoading: false,
        username: '',
        password: ''
      });
    }

  handleSignupRedirect() {
    this.props.navigator.push({
      component: Signup,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      accountType: this.state.accountType
    });
    this.setState({
      isLoading: false,
      error: false,
      username: '',
      password: ''
    });
  }

  handleSwitch(value) {
    var accountType = value ? 'teacher' : 'student';
    this.setState({
      switchState: value,
      accountType: accountType
    });
  }

  selectQuickClass() {
    if(this.state.accountType=='teacher') {
      var randomId = '' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) 
          + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
      var classCode = 'qc' + randomId;

      this.socket = io(server, {jsonp: false});
      this.socket.emit('teacherQuickClassConnect' , {classId: classCode});
      this.setState({
        teacherModalId: randomId,
        teacherModalClassId: classCode,
        teacherModalSocket: this.socket
      });
    }
    this.setState({
      modalVisible: true
    });
  }

  handleStudentModalSubmit(secretCode) {
    var classCode = 'qc' + secretCode;
    var userId = null;
    this.setState({
      modalVisible: false
    });
    //assuming code is valid:
    this.socket = io(server, {jsonp: false});
    this.socket.emit('studentQuickClassConnect', {userId: userId, classId: classCode});
    var classObj = {
      id: classCode,
      name: 'Quick Class: ' + classCode 
    };
    this.props.navigator.push({
      component: ClassStandbyView,
      class: classObj,
      userId: userId,
      socket: this.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    });
  }

  handleTeacherModalSubmit() {
    this.setState({
      modalVisible: false
    });
    this.props.navigator.push({
      component: RequestFeedbackView,
      classId: this.state.teacherModalClassId,
      lessonId: 'Quick Class',
      socket: this.state.teacherModalSocket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    });
  }

  handleModalCancel() {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    var showErr = (
      this.state.error ? <Text style={styles.err}> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.loginContainer}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Header Will Go Here
            </Text>
          </View>

          <Text style={styles.fieldTitle}> Username </Text>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            style={styles.userInput}
            value={this.state.username}
            returnKeyType={'next'}
            onChange={this.handleUsernameChange.bind(this)}
            onSubmitEditing={(event) => { 
              this.refs.SecondInput.focus(); 
            }}
             />
          <Text style={styles.fieldTitle}> Password </Text>
          <TextInput
            ref='SecondInput'
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={16}
            secureTextEntry={true}
            style={styles.userInput}
            value={this.state.password}
            returnKeyType={'go'}
            onChange={this.handlePasswordChange.bind(this)} 
            onSubmitEditing={this.handleLoginSubmit.bind(this)}/>
          <TouchableHighlight
            style={styles[this.state.accountType + 'Button']}
            onPress={this.handleLoginSubmit.bind(this)}
            underlayColor='#e66365'>
            <Text style={styles.buttonText}> {this.state.accountType[0].toUpperCase() + this.state.accountType.slice(1)
            + ' Sign In'} </Text>
          </TouchableHighlight>

          <Text style={{alignSelf:'center', marginTop: 20}}> -or- </Text>

          <TouchableHighlight
            style={styles[this.state.accountType + 'Button']}
            onPress={this.selectQuickClass.bind(this)}
            underlayColor='#e66365'>
            <Text style={styles.buttonText}> 
            {this.state.accountType == 'student' ? 'Join Quick Class' : 'Start Quick Class'} </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.handleSignupRedirect.bind(this)}
            underlayColor='#ededed'>
            <Text style={styles.signup}> {"Don't have an account yet? Click here to create a " 
            + this.state.accountType + " account!"}  </Text>
          </TouchableHighlight>

          <ActivityIndicatorIOS
            animating= {this.state.isLoading}
            size='large' 
            style={styles.loading} />
          {showErr}

          <View style={styles.switchContainer}>
            <Text> Student </Text>
            <Switch
              onValueChange={(value) => {this.handleSwitch(value)}}
              value={this.state.switchState} 
            />
            <Text> Teacher </Text>
          </View>

        </View>

        <StudentQCModal visible={this.state.modalVisible && this.state.accountType=='student'} 
          onEnter={this.handleStudentModalSubmit.bind(this)} onCancel={this.handleModalCancel.bind(this)}
        />
        <TeacherQCModal visible={this.state.modalVisible && this.state.accountType=='teacher'} 
          onEnter={this.handleTeacherModalSubmit.bind(this)}
          randomId={this.state.teacherModalId}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    marginBottom: 30
  },
  headerText: {
    fontSize: 18,
    alignSelf: 'center'
  },
  loginContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fieldTitle: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    color: '#616161'
  },
  userInput: {
    height: 50,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
  studentButton: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#219dff',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  teacherButton: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  signup: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center'
  },
  loading: {
    marginTop: 20
  },
  err: {
    fontSize: 14,
    textAlign: 'center'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

module.exports = Login;
