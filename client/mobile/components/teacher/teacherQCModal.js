var React = require('react-native');
require('./../../utils/userAgent');
var io =require('socket.io-client/socket.io');
var env = require('./../../utils/environment');
var server = env.server + ':' + env.port;

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Dimensions
} = React;


class TeacherQCModal extends React.Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window');
    var randomId = '' + Math.floor(Math.random() * 10) 
      + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    var classCode = 'qc' + randomId;

    this.socket = io(server, {jsonp: false});
    this.socket.emit('teacherQuickClassConnect' , {classId: classCode});

    this.state = {
      randomId: randomId,
      classId: classCode,
      height: height,
      width: width,
      socket: this.socket
    };
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animated={true}>
        <View style={styles.modal}>
          <View style={{height:this.state.height * 0.6, width:this.state.width * 0.8}}>
            <View style={styles.modalBox}>
              <Text> Your secret code is: </Text>
              <Text> {this.state.randomId} </Text>
              <TouchableHighlight onPress={this.props.onEnter.bind(null, this.state.classId, this.state.socket)}>
                <Text> Okay </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  userInput: {
    height: 50,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
  }
});

module.exports = TeacherQCModal;


