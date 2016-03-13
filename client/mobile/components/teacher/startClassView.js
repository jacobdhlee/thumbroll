var React = require('react-native');
var RequestFeedbackView = require('./requestFeedbackView');
var api = require('./../../utils/api.js');

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
      //classes: this.props.route.classes
      classes: ['Quick Class', 'CS 101', 'CS 201']
    };
  }

  selectClass(classId) {
    console.log(classId);
    // if(classId === /*whatever is quick class*/) {
    //   // socket emit class is open
    //   this.props.navigator.push({
    //     component: RequestFeedbackView,
    //     lessonId: 'default',
    //     sceneConfig: {
    //       ...Navigator.SceneConfigs.FloatFromRight,
    //       gestures: {}
    //     }
    //   });
    // } else {
    //   // once including lessons, will need to fetch lesson data when selecting lesson
    //     //pass lesson data through navigator
    //   api.getLessons(classId)
    //   .then((response) => {
    //     var body = JSON.parse(response.body);
    //     this.props.navigator.push({
    //       component: SelectLessonsView,
    //       lessons: body.lessons
    //       classId: classId,
    //       sceneConfig: {
    //         ...Navigator.SceneConfigs.FloatFromRight,
    //         gestures: {}
    //       }
    //     });  
    //   })
    // }
    
    //currently skipping lessons
    //open socket for class (to allow attendence, messages, etc)
    this.props.navigator.push({
      component: RequestFeedbackView,
      classId: classId,
      lessonId: 'default',
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    });
  }

  renderClasses(classes) {
    return classes.map((className, index) => {
      return (
        <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity onPress={this.selectClass.bind(this, className)} style={styles.button}>
            <Text style={styles.buttonText}> {className} </Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    return (
      //need back/logout button
      //will want to show loading symbol until classes are pulled from DB
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
