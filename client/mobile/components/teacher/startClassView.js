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
      userId: this.props.route.userId,
      classes: ['Quick Class', 'CS 101', 'CS 201']
    };
  }

  selectClass(className) {
    console.log(className);
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

  renderClasses(classes) {
    return classes.map((className, index) => {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.selectClass.bind(this, className)} style={styles.button}>
            <Text style={styles.buttonText}> {className} </Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.viewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.pageText}> Start Class: </Text>
          </View>
          <View style={styles.buttonsContainer}>
            {this.renderClasses(this.state.classes)}
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
    fontSize: 20
  },
  buttonsContainer: {
    padding: 20
  },
  buttonContainer: {
    margin: 20
  },
  button: {

  },
  buttonText: {
    fontSize: 20
  }
});

module.exports = StartClassView;