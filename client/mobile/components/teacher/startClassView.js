var React = require('react-native');
// var api = require('../Utils/api');

var {
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableOpacity
} = React;

class StartClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.userId
    };
  }

  selectClass() {
    // this.props.navigator.push({
    //   component: StartClassView,
    //   userId: 'teacher',
    //   sceneConfig: {
    //     ...Navigator.SceneConfigs.FloatFromBottom,
    //     gestures: {}
    //   }
    // });
    // this.setState({
    //   isLoading: false,
    //   error:false
    // });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.viewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.pageText}> Start Class: </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.selectClass} style={styles.button}>
                <Text style={styles.buttonText}> CS 101 </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.selectClass} style={styles.button}>
                <Text style={styles.buttonText}> CS 201 </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pageText: {

  },
  buttonsContainer: {

  },
  buttonContainer: {

  },
  button: {

  },
  buttonText: {

  }
});

module.exports = StartClassView;