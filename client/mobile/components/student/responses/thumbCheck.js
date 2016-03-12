var React = require('react-native');
var Slider = require('react-native-slider');
var {
  View,
  Text,
  StyleSheet,
  ScrollView,
} = React;

class ThumbCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  previousPage() {
    this.props.navigator.pop();
  }

  valueChange(value) {
    console.log('$$$$$$$$$',value)
    this.setState({value: Math.floor(value)})
  }
  
  render() {
    return (
      <View style={styles.mainDiv}>
        <View>
          <Text>Hi</Text>
        </View>
        <View>
          <Text onPress={this.previousPage.bind(this)}>Back</Text>
        </View>
        <View style={styles.container}>
          <Slider
            trackStyle={customStyles.track}
            thumbStyle={customStyles.thumb}
            minimumTrackTintColor='#30a935'
            value={this.state.value}
            maximumValue={100}
            onValueChange={this.valueChange.bind(this)} />
          <Text>Value: {this.state.value}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  mainDiv: {
    backgroundColor: '#6ECFBF',
  }
})

var customStyles = StyleSheet.create({
  track: {
      height: 4,
      borderRadius: 2,
    },
    thumb: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: 'white',
      borderColor: '#30a935',
      borderWidth: 2,
    }
});


module.exports = ThumbCheck;