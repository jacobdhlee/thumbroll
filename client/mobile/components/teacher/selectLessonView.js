var React = require('react-native');
var RequestFeedbackView = require('./requestFeedbackView');
var api = require('./../../utils/api');

var {
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  ScrollView,
  ListView
} = React;

class SelectLessonView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //classes: this.props.route.classes
      lessons: this.props.route.lessons,
      socket: this.props.route.socket,
      classId: this.props.route.classId,
    };
  }

  selectLesson(lessonId) {
    
    this.props.navigator.push({
      component: RequestFeedbackView,
      lessonId: lessonId,
      socket: this.state.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    });
  }

  renderLessons(lessons) {
    return lessons.map((lessonName, index) => {
      return (
        <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity onPress={this.selectLesson.bind(this, lessonName)} style={styles.button}>
            <Text style={styles.buttonText}> {lessonName} </Text>
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
            <Text style={styles.pageText}> Your Lessons </Text>
          </View>
          <ScrollView>
            <View style={styles.buttonsContainer}>
              {this.renderLessons(this.state.lessons)}
            </View>
          </ScrollView>
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

module.exports = SelectLessonView;
