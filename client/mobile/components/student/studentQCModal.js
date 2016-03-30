var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Modal,
  Dimensions
} = React;


class StudentQCModal extends React.Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {
      secretCode: '',
      height: height,
      width: width,
    }
  }

  handleCodeChange(event) {
    this.setState({
      secretCode: event.nativeEvent.text
    });
  }

  handleCancel() {
    this.setState({
      secretCode: ''
    });
    this.props.onCancel();
  }

  handleEnter() {
    var secretCode = this.state.secretCode;
    this.setState({
      secretCode: ''
    });
    this.props.onEnter.call(null, secretCode)
  }


  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animated={true}>
        <View style={styles.modal}>
          <View style={{height:this.state.height * 0.6, width:this.state.width * 0.8}}>
            <View style={styles.modalBox}>
              <Text> Enter the secret code from your lecturer: </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                maxLength={4}
                style={styles.userInput}
                keyboardType='numeric'
                value={this.state.secretCode}
                returnKeyType={'done'}
                onChange={this.handleCodeChange.bind(this)}
                onSubmitEditing={this.props.onEnter.bind(null, this.state.secretCode)}
              />
              <TouchableHighlight onPress={this.handleEnter.bind(this)}>
                <Text> Enter </Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.handleCancel.bind(this)}>
                <Text> Cancel </Text>
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
    backgroundColor: '#424242',
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

module.exports = StudentQCModal;

