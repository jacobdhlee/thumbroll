var React = require('react-native');
var ThumbCheck =  require('./responses/thumbCheck.js');
var MultiChoice =  require('./responses/multiChoice.js');
var NavBar = require('./../shared/navbar');
var Button = require('./../shared/button');

var {
  Alert,
  Text,
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Navigator,
  TouchableOpacity,
  TextInput
} = React;

class ClassStandbyView extends React.Component {
  constructor(props){ 
    var {height, width} = Dimensions.get('window');
    super(props);
    this.state = {
      height: height,
      width: width,
      socket: this.props.route.socket,
      user: this.props.route.user,
      class: this.props.route.class,
      modal: false,
      question: ''
    };
    var that = this;
    this.state.socket.on('teacherJoinedRoom', () => {
      this.state.socket.emit('studentConnect', {user: this.state.user, classId: this.state.class.class.id})
    });

    this.state.socket.on('teacherCalledOnStudent', () => {
      Alert.alert('Teacher Message', 'You Got selected');
    })

    this.state.socket.on('newPoll', function(pollInfo) {
      console.log('message received from server!', pollInfo);
      if(pollInfo.pollObject.id == 1) {
        that.thumbcheckPage(pollInfo);
      } else if(pollInfo.pollObject.id == 2) {
        that.multiPage(pollInfo);
      }
    });
  }

  thumbcheckPage(pollInfo) {
    this.props.navigator.push({
      component: ThumbCheck,
      pollInfo: pollInfo,
      user: this.state.user,
      socket: this.state.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }

  multiPage(pollInfo) {
    this.props.navigator.push({
      component: MultiChoice,
      pollInfo: pollInfo,
      user: this.state.user,
      socket: this.state.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }
  raiseHand() {
    this.state.socket.emit('raiseHand', {user: this.state.user});
    Alert.alert('Raise Hand', 'Wating for the teacher response');
    console.log('raiseHand');

  }
  previousSection() {
    this.state.socket.emit('studentLeavingClass', {user: this.state.user, classId:this.state.class.id});
    // this.state.socket.removeListener('newPoll');
    this.state.socket.disconnect();
    this.props.navigator.pop();
  }

  beforeLogout() {
    this.state.socket.emit('studentLoggingOut', {user:this.state.user});
  }
  askQuestion() {
    this.setState({
      modal: true,
    })
  }

  closeQuestion() {
    this.state.socket.emit('askQuestions', {question: this.state.question, student: this.state.user});
    this.setState({
      modal: false,
      question: '',
    })
    return (
      Alert.alert('Question submit', 'Wating for the teacher response')
    )
  }

  render(){
    var name = this.state.class.class.name;
    if(!name) {
      name = his.state.class.name;
    }
    return(
      <View style={{flex:1}}>
        <NavBar navi={this.props.navigator} onBack={this.previousSection.bind(this)} 
          beforeLogout={this.beforeLogout.bind(this)}>
          {name}
        </NavBar>
        <View>
          <Text onPress={this.thumbcheckPage.bind(this)} >ThumbCheck</Text>
        </View>
        <View>
          <Text onPress={this.multiPage.bind(this)} >MutipleChoice</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textSizeOne}>Waiting for Teacher!</Text>
          <Button onPress={this.raiseHand.bind(this)} text={'RaiseHand'}/>
          <Button onPress={this.askQuestion.bind(this)}text={'Ask short Question'} />
        </View>

        <Modal visible={this.state.modal} transparent={true} animated={true}>
          <View style={styles.modal}>
            <View style={{height:this.state.height * 0.9, width:this.state.width * 0.9}}>
              <View style={styles.modalBox}>
                <Text> Enter your Question </Text>
                <TextInput
                  autoCapitalize={'sentences'}
                  autoCorrect={true}
                  style={styles.userInput}
                  keyboardType='default'
                  returnKeyType={'done'}
                  keyboardAppearance='dark'
                  clearTextOnFocus={true}
                  multiline={true}
                  onChangeText={(text) => this.setState({ question: text})}
                  value={this.state.question}
                />
                <TouchableOpacity>
                  <Button onPress={this.closeQuestion.bind(this)} text={'submit'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  topStyle: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed'
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

  textSize: {
    fontSize : 20
  },

  userInput: {
    height: 300,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  },

  container:{
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textSizeOne: {
    fontSize : 35,
    fontWeight: 'bold',
  }
})
module.exports = ClassStandbyView;
