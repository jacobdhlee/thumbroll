var React = require('react-native');
// var api = require('../Utils/api');

var {
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableOpacity
} = React;

class RequestFeedbackView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.userId,
      classId: this.props.route.classId
    };
  }

  selectFeebackOption(type) {
    console.log(type);
    // this.props.navigator.push({
    //   component: RequestFeedbackView,
    //   userId: this.state.userId,
    //   classId: classId,
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
            <Text style={styles.pageText}> Request Feedback: </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.selectFeebackOption.bind(this, 'thumbs')} style={styles.button}>
                <Text style={styles.buttonText}> Thumbs Check </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.selectFeebackOption.bind(this, 'multChoice')} style={styles.button}>
                <Text style={styles.buttonText}> Multiple Choice </Text>
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

module.exports = RequestFeedbackView;