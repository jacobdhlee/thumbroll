var React = require('react-native');
var FeedbackView = require('./display_feedback/feedbackView');
var api = require('./../../utils/api');
var NavBar = require('./../shared/navbar');
var Button = require('./../shared/button');

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
      lessonId: this.props.route.lessonId,
      classId: this.props.route.classId,
      socket: this.props.route.socket,
      modal: false,
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
      ],
      numberOfStudentHands: 0,
    };
    //populate feedbackOptions with anything custom from lesson
    this.state.socket.on('raiseHand', function(student){
      var numberOfStudentHands = this.state.numberOfStudentHands + 1;
      console.log('userId >>>>>>>>>>>>', student.userId);
      this.setState({numberOfStudentHands: numberOfStudentHands});
      this.numberOfRaiseHand(this.state.numberOfStudentHands);
      console.log('numberOfRaiseHand >>>>>>>>>>>>>>>',this.numberOfRaiseHands)
    }.bind(this))

  }

  dismissClass() {
    // emit socket dismissClass
    this.state.socket.emit('dismiss');
    this.props.navigator.pop();
  }

  selectRaiseHands() {

  }


  selectFeebackOption(feedbackOption) {
    api.startPoll(feedbackOption, this.state.lessonId, this.state.classId)
    .then((response) => {
      if(response.status === 500) {
        console.error('Server error', response);
      } else if(response.status === 201) {
        var pollId = JSON.parse(response._bodyText).pollId;
        this.props.navigator.push({
          component: FeedbackView,
          lessonId: this.state.lessonId,
          pollId: pollId,
          feedbackOption: feedbackOption,
          socket: this.state.socket,
          sceneConfig: {
            ...Navigator.SceneConfigs.FloatFromRight,
            gestures: {}
          }
        });
      } else {
        console.error('Error getting poll data', response);
      }
    })
    .catch((err) => {
      console.error('Error starting poll', err);
    });
  }

  renderFeedbackOptions(feedbackOptions) {
    return feedbackOptions.map((feedbackOption, index) => {
      return (      
        <Button key={index} onPress={this.selectFeebackOption.bind(this, feedbackOption)} text={feedbackOption.name} />
      )
    })
  }

  render() {
    //need end class / back button

    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <NavBar navi={this.props.navigator}>Request Feedback</NavBar>
        <View style={styles.viewContainer}>
          <Button onPress={this.dismissClass.bind(this)} text={'Dismiss Class'}/>
          {this.renderFeedbackOptions(this.state.feedbackOptions)}
        </View>
        <View style={{flexDirection: 'column', height:60, width: null}}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor:'yellow', height:60, width: 100, alignSelf:'flex-end'}}>
            <TouchableOpacity>
              <Text style={styles.textSize}>
                {this.state.numberOfStudentHands}
              </Text>
            </TouchableOpacity>
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
  textSize: {
    fontSize : 25,
    fontWeight: 'bold',
  }
});

module.exports = RequestFeedbackView;
