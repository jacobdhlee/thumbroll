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
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
  TextInput,
  Dimensions,
} = React;

class RequestFeedbackView extends React.Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {
      lessonId: this.props.route.lessonId,
      classId: this.props.route.classId,
      socket: this.props.route.socket,
      modal: false,
      modalQuestion: false,
      height: height,
      width: width,
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
      raisedHandList: [],
      count: 0,
      questionLists:[],
    };
    //populate feedbackOptions with anything custom from lesson
    this.state.socket.on('studentRaisedHand', function(data){
      var raisedHandList = this.state.raisedHandList.slice();
      if(raisedHandList.length === 0) {
        if(data.user.firstName) {
          raisedHandList.unshift({id: data.user.uid, student: data.user.firstName + ' ' + data.user.lastName , active: true});    
        } else {
          raisedHandList.unshift({id: data.user.uid, student: data.user.uid, active: true});
        }
      } else {
        for(var i = 0; i < raisedHandList.length; i++){
          if(raisedHandList.length < 5 && data.user.uid !== raisedHandList[i].id) {
            if(data.user.firstName) {
              raisedHandList.unshift({id: data.user.uid, student: data.user.firstName + ' ' + data.user.lastName , active: true});    
            } else {
              raisedHandList.unshift({id: data.user.uid, student: data.user.uid, active: true});
            }
          } 
        }
      }
      this.setState({
        raisedHandList: raisedHandList,
      });
    }.bind(this))

    this.state.socket.on('studentQuestions', function(data){
      var questionLists = this.state.questionLists.slice();
      if(data.student.firstName) {
        var student = data.student.firstName + ' ' + data.student.lastName;
      } else {
        var student = data.student.uid
      }
      questionLists.push({question: data.question, student: student});
      this.setState({
        questionLists: questionLists,
      })
    }.bind(this))
  }

  answeredQuestion() {
    var questionLists = this.state.questionLists.slice();
    questionLists.shift();
    this.setState({
      questionLists: questionLists,
    })
  }

  clickQuestion() {
    this.setState({
      modalQuestion: !this.state.modalQuestion,
    })
  }

  clickRaisedHand() {
    var count = this.state.count + 1;
    this.setState({
      modal: !this.state.modal,
      count: count,
    })
    if(this.state.modal === false) {
      this.setState({
        count: 0,
      })
    }
  }

  dismissClass() {
    // emit socket dismissClass
    this.state.socket.emit('dismiss');
    // if quickClass, need to disconnect from socket
    if(this.state.lessonId = 'Quick Class') {
      this.state.socket.disconnect();
    }
    this.props.navigator.pop();
  }

  beforeLogout() {
    this.state.socket.emit('teacherLoggingOut');
  }

  listQuestion(list) {
    if( list.length === 0 ) {
      return(
        <Text>No Question yet</Text>
      )
    } 
    return (
      <View>
        <Text>Question from {list[0].student}</Text>
        <Text>{list[0].question}</Text>
      </View>
    )
  }

  listStudent(list) {
    if(list.length === 0) {
      return (
        <Text>No one raised hand yet</Text>
      )
    }
    return list.map((student, index) => {
      if(!this.state.modal && this.state.count > 0) {
        student.active = false
      }
      if(student.active){
        return (
          <View key={index}>
            <Text style={styles.studentName}>
              {student.student}
            </Text>
          </View>     
        )
      } else {
        return (
          <View key={index}>
            <Text style={styles.studentNameChange}>
              {student.student}
            </Text>
          </View>     
        )
      }
    })
  }

  clearList() {
    this.setState({
      raisedHandList: [],
      count: 0,
    })
  }

  callOnStudent() {
    var studentsObj = this.props.route.getActiveStudents();
    var keys = Object.keys(studentsObj);
    var index = Math.floor(Math.random() * keys.length);
    var randomKey = keys[index];
    var student = studentsObj[randomKey];
    console.log('Calling on:', student);
    this.state.socket.emit('callOnStudent', student);
    if(student.firstName) {
      Alert.alert('Called on', student.firstName + ' ' + student.lastName);
    } else {
      Alert.alert('Called on student', student.uid);
    }
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
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <NavBar navi={this.props.navigator} beforeLogout={this.beforeLogout.bind(this)} 
          onBack={this.dismissClass.bind(this)}>
          Request Feedback
        </NavBar>
        <View style={styles.viewContainer}>
          <Button onPress={this.dismissClass.bind(this)} text={'Dismiss Class'}/>
          {this.renderFeedbackOptions(this.state.feedbackOptions)}
          <Button onPress={this.callOnStudent.bind(this)} text={'Call On Student'}/>
        </View>
          <View style={{flexDirection: 'row', height:60, width: null, alignSelf:'flex-end'}}>
          <TouchableOpacity onPress={this.clickQuestion.bind(this)}style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'yellow', height: 60, width: 100}}>
              <Text style={styles.textSize}>
                Q:{this.state.questionLists.length}
              </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.clickRaisedHand.bind(this)} style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'red', height: 60, width: 100}}>
              <Text style={styles.textSize}>
                R : {this.state.raisedHandList.length}
              </Text>
          </TouchableOpacity>
        </View>


        <Modal visible={this.state.modal} transparent={true} animated={true}>
          <View style={styles.modal}>
            <View style={{height:this.state.height * 0.8, width:this.state.width * 0.9}}>
              <View style={styles.modalBox}>
                <Text style={styles.textSizeModal}> Raised hand student: </Text>
                {this.listStudent(this.state.raisedHandList)}
              </View>
              <Button onPress={this.clickRaisedHand.bind(this)} text={'Close'}/>
              <Button onPress={this.clearList.bind(this)} text={'clear'}/>
            </View>
          </View>
        </Modal>

        <Modal visible={this.state.modalQuestion} transparent={true} animated={true}>
          <View style={styles.modal}>
            <View style={{height:this.state.height * 0.8, width:this.state.width * 0.9}}>
              <View style={styles.modalBox}>
                <Text style={styles.textSizeModal}> Question </Text>
                {this.listQuestion(this.state.questionLists)}
              </View>
              <Button onPress={this.answeredQuestion.bind(this)} text={'answered'} />
              <Button onPress={this.clickQuestion.bind(this)} text={'Close'}/>
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
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textSizeModal: {
    fontSize : 20,
    fontWeight: 'bold',
  },
  studentName: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  studentNameChange:{
    fontSize: 35,
    fontWeight: 'bold',
    color: '#C6C7C3',
  },
  textSize: {
    fontSize : 25,
    fontWeight: 'bold',
  },
});

module.exports = RequestFeedbackView;
