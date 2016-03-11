var React = require('react-native');
// var api = require('../Utils/api');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Navigator
} = React;

class StartClassView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.userId
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.viewContainer}>
          <Text style={styles.pageTitle}> Start Class: </Text>
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
  pageTitle: {

  }
});

module.exports = StartClassView;