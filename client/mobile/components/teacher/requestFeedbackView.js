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
      classId: this.props.route.classId,
      lessonId: 'default',
      feedbackOptions: [
        {
          id: 1,
          name: 'Thumbs Check',
          /*options:{for preset answers?}*/
        },
        {
          id: 2,
          name: 'Multiple Choice'
        }
      ]
    };
  }

  selectFeebackOption(optionId) {
    console.log(optionId);
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

  renderFeedbackOptions(options) {
    return options.map((option, index) => {
      return (
        <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity onPress={this.selectFeebackOption.bind(this, option.id)} style={styles.button}>
            <Text style={styles.buttonText}> {option.name} </Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    //need end class / back button
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.viewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.pageText}> Request Feedback: </Text>
          </View>
          <View style={styles.buttonsContainer}>
            {this.renderFeedbackOptions(this.state.feedbackOptions)}
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