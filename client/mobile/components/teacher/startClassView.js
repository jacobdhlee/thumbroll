var React = require('react-native');
var RequestFeedbackView = require('./requestFeedbackView');
var api = require('./../../utils/api');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var env = require('./../../utils/environment');
var server = env.server + ':' + env.port;
var RNChart = require('react-native-chart');

var {
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  ScrollView,
  ListView
} = React;

class StartClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //classes: this.props.route.classes
      classes: ['Quick Class', 'CS 101', 'CS 201', 'CS 401'],
    };
  }

  selectClass(classId) {
    console.log(classId);
    // if(classId === /*whatever is quick class*/) {
    //   // socket emit class is open
    //   this.props.navigator.push({
    //     component: RequestFeedbackView,
    //     lessonId: 'default',
        // socket: this.state.socket,
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
          // socket: this.state.socket,
    //       sceneConfig: {
    //         ...Navigator.SceneConfigs.FloatFromRight,
    //         gestures: {}
    //       }
    //     });  
    //   })
    // }
    
    //currently skipping lessons
    //open socket for class (to allow attendence, messages, etc)
    // pass with url for class?
    this.socket = io(server, {jsonp: false});

    this.socket.emit('teacherConnect');

    this.props.navigator.push({
      component: RequestFeedbackView,
      classId: classId,
      lessonId: 1,
      socket: this.socket,
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
            <Text style={styles.pageText}> Your classes </Text>
          </View>
          <ScrollView>
            <View style={styles.buttonsContainer}>
              {this.renderClasses(this.state.classes)}
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

module.exports = StartClassView;
