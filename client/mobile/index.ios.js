var React = require('react-native');
var Login = require('./components/shared/login');
require('./utils/userAgent');
var io =require('socket.io-client/socket.io');

var {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  Text,
  View
} = React;

class thumbroll extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{
          component: Login
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator, route });
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('thumbroll', () => thumbroll);
