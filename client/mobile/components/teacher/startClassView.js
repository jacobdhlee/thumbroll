var React = require('react-native');
var SelectLessonView = require('./selectLessonView');
var RequestFeedbackView = require('./requestFeedbackView');
var api = require('./../../utils/api');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var env = require('./../../utils/environment');
var server = env.server + ':' + env.port;

var {
  View,
  Text,
  StyleSheet,
  Navigator,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ListView
} = React;

class StartClassView extends React.Component {
  constructor(props) {
    var {height, width} = Dimensions.get('window');
    super(props);
    this.state = {
      classes: [{id: 1, name:'Quick Class'}, {id:2, name:'CS 101'}, {id:3, name: 'CS 201'}],
      height: height,
      width: width,
      randomId: '',
      modalVisible: false,
    };
  }

  selectQuickClass() {
    // generate modal with randomID
    var randomId = '' + Math.floor(Math.random() * 10) 
      + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    this.setState({
      randomId: randomId,
      modalVisible: true
    });
    this.socket = io(server, {jsonp: false});
    this.socket.emit('teacherQuickClassConnect' , {classId: randomId});
  }

  navigateFromModal() {
    this.setState({
      modalVisible: false
    });
    this.props.navigator.push({
      component: RequestFeedbackView,
      classId: this.state.randomId,
      lessonId: 'Quick Class',
      socket: this.state.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromRight,
        gestures: {}
      }
    });
  }

  selectClass(classId) {
    api.getLessons(classId)
    .then((response) => {
      if(response.status === 500){
        console.error('err getting class data');
      } else if(response.status === 200) {
        var lessons = JSON.parse(response._bodyText);

        this.socket = io(server, {jsonp: false});
        this.socket.emit('teacherConnect' , {classId: classId});
        
        this.props.navigator.push({
          component: SelectLessonView,
          classId: classId,
          lessons: lessons,
          socket: this.socket,
          sceneConfig: {
            ...Navigator.SceneConfigs.FloatFromRight,
            gestures: {}
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  renderClasses(classes) {
    return classes.map((cls, index) => {
      return (
        <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity onPress={this.selectClass.bind(this, cls.id)} style={styles.button}>
            <Text style={styles.buttonText}> {cls.name} </Text>
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
            <Text style={styles.pageText}> Your classes </Text>
          </View>
          <ScrollView>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={this.selectQuickClass.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}> Start Quick Class </Text>
              </TouchableOpacity>
            </View>
              {this.renderClasses(this.state.classes)}
          </ScrollView>
        </View>
        <Modal visible={this.state.modalVisible} transparent={true} animated={true}>
          <View style={styles.modal}>
            <View style={{height:this.state.height * 0.6, width:this.state.width * 0.8}}>
              <View style={styles.modalBox}>
                <Text> Your secret code is: </Text>
                <Text> {this.state.randomId} </Text>
                <TouchableHighlight onPress={this.navigateFromModal.bind(this)}>
                  <Text> Okay </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
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
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

module.exports = StartClassView;
