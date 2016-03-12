var React = require('react-native');
var FeedbackView = require('./display_feedback/feedbackView.js');
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
    //populate feedbackOptions with anything custom from lesson
  }

  dismissClass() {
    this.props.navigator.pop();
  }

  selectFeebackOption(feedbackOption) {
    // emit socket event
    this.props.navigator.push({
      component: FeedbackView,
      userId: this.state.userId,
      classId: this.state.classId,
      lessonId: this.state.lessonId,
      feedbackOption: feedbackOption,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    });
  }

  renderFeedbackOptions(feedbackOptions) {
    return feedbackOptions.map((feedbackOption, index) => {
      return (
        <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity onPress={this.selectFeebackOption.bind(this, feedbackOption)} style={styles.button}>
            <Text style={styles.buttonText}> {feedbackOption.name} </Text>
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
        <View style={styles.dismissContainer}>
          <TouchableOpacity onPress={this.dismissClass.bind(this)} style={styles.dismissButton}>
            <Text style={styles.dismissText}> Dismiss Class </Text>
          </TouchableOpacity>
        </View>
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
  dismissContainer: {

  },
  dismissButton: {

  },
  dismissText: {

  },
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
