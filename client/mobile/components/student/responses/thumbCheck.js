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
    this.setState({value:value})
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
            style={customStyles8.container}
            trackStyle={customStyles8.track}
            thumbStyle={customStyles8.thumb}
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
  caption: {
    //flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  mainDiv: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#6ECFBF',
  }
})

var customStyles8 = StyleSheet.create({
  container: {
    height: 20,
  },
  track: {
    height: 2,
    backgroundColor: '#303030',
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: '#31a4db',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});


module.exports = ThumbCheck;