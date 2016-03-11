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
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.nativeEvent.text
    });
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
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.loginContainer}>
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
            onSubmitEditing={this.handleSubmit.bind(this)}/>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor='#e66365'>
            <Text style={styles.buttonText}> Sign In </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.handleRedirect.bind(this)}
            underlayColor='#ededed'>
            <Text style={styles.signup}> {"Don't have an account yet? Sign Up!"}  </Text>
          </TouchableHighlight>

          <ActivityIndicatorIOS
            animating= {this.state.isLoading}
            size='large' 
            style={styles.loading} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fieldTitle: {

  },
  userInput: {
    height: 50,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {

  },
  buttonText: {

  },
  signup: {

  },
  loading: {

  }
});

module.exports = Login;