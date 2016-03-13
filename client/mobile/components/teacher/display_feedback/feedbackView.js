var React = require('react-native');
var PercentageChart = require('./percentageChart.js');
var HistogramChart = require('./histogramChart.js');
// var api = require('../Utils/api');

var {
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  Dimensions
} = React;

class FeedbackView extends React.Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {
      userId: this.props.route.userId,
      classId: this.props.route.classId,
      lessonId: this.props.route.lessonId,
      feedbackOption: this.props.route.feedbackOption,
      height: height,
      width: width
    };
  }

  exitPage() {
    this.props.navigator.pop();
  }

  renderChart() {
    if(this.state.feedbackOption.id === 1) {
      return (
        <View style={{ width: this.state.width, height: this.state.height * 0.7, backgroundColor: 'red'}}>
          {React.createElement(PercentageChart)}
        </View>
      )
    } else if(this.state.feedbackOption.id === 2) {
      return (
        <View style={{ width: this.state.width, height: this.state.height * 0.7, backgroundColor: 'red'}}>
          {React.createElement(HistogramChart)}
        </View>
      )
    }
  }

  render() {
    //need back button
    return (
      <View style={{flex: 1, backgroundColor: '#ededed'}}> 
        <View style={styles.viewContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={this.exitPage.bind(this)} style={styles.backButton}>
            <Text style={styles.backButtonText}> Save and Exit </Text>
          </TouchableOpacity>
        </View>
          <View style={styles.titleContainer}>
            <Text style={styles.pageText}> {this.state.feedbackOption.name} </Text>
          </View>
          {this.renderChart.bind(this)()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backButtonContainer: {

  },
  backButton: {

  },
  backButtonText: {

  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pageText: {
    fontSize: 20
  },
  chartContainer: {
    backgroundColor: 'red'
  }
});

module.exports = FeedbackView;
