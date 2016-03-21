var React = require('react-native');

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

    this.state = {
      height: height,
      width: width,
    };
  }

  handleEnter() {
    this.props.onEnter.call(null)
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animated={true}>
        <View style={styles.modal}>
          <View style={{height:this.state.height * 0.6, width:this.state.width * 0.8}}>
            <View style={styles.modalBox}>
              <Text> Your secret code is: </Text>
              <Text> {this.props.randomId} </Text>
              <TouchableHighlight onPress={this.handleEnter.bind(this)}>
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


