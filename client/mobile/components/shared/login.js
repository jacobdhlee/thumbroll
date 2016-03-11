var React = require('react-native');
// var NavigationBar = require('react-native-navbar');
// var api = require('../Utils/api');
// var Signup = require('./signup');
// var Keychain = require('react-native-keychain');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator
} = React;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: false
    };
    // check for token match in keychain with server, if it is good.. go to camera view
    // Keychain
    //   .getGenericPassword()
    //   .then((credentials) => {
    //     console.log('getting from Keychain: ', credentials);
    //   }).catch((err) => {
    //     // Keychain not found. User must login
    //   });
  }


  handleUsernameChange(event) {
    // this.setState({
    //   username: event.nativeEvent.text
    // });
  }

  handlePasswordChange(event) {
    // this.setState({
    //   password: event.nativeEvent.text
    // });
  }

  handleSubmit(){
      // this.setState({
      //   isLoading: true
      // });
      // api.login(this.state.username, this.state.password)
      //   .then((res) => {
      //     if(res.status === 500){
      //       this.setState({
      //          error: 'Username or password is incorrect',
      //          isLoading: false
      //        });
      //     } else {
      //       // load the JSON Web token into the keychain (keychain is the storage loction given to us by ios)
      //       var bodyText = JSON.parse(res._bodyText);
      //       Keychain.setGenericPassword(null, bodyText.token)
      //       console.log('Credentials saved successfully!', bodyText.userId, bodyText.token);
      //       this.props.navigator.push({
      //         component: Main,
      //         userId: bodyText.userId,
      //         sceneConfig: {
      //           ...Navigator.SceneConfigs.FloatFromBottom,
      //           gestures: {}
      //         }
      //       });

      //         this.setState({
      //           isLoading: false,
      //           error: false,
      //           username: '',
      //           password: ''
      //         });
      //       }
      //     }).catch((err) => {
      //        this.setState({
      //          error: 'User not found' + err,
      //          isLoading: false
      //        });
      //     });
    }

  handleRedirect() {
    // this.props.navigator.push({
    //   component: Signup,
    //   sceneConfig: Navigator.SceneConfigs.FloatFromRight
    // });
    // this.setState({
    //   isLoading: false,
    //   error: false,
    //   username: '',
    //   password: ''
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ==Login Page==
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Login;