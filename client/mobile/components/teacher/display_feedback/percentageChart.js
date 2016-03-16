var React = require('react-native');
// var api = require('../Utils/api');

var {
  View,
  Text,
  Navigator,
} = React;

var studentData;

class PercentageChart extends React.Component {
  constructor(props) {
    super(props);
    //options need to be here?
  }

  render() {
    //need back button
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <Text> Percentage Chart Here </Text>
      </View>
    )
  }
}


module.exports = PercentageChart;
