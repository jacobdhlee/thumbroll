var React = require('react-native');
var PercentageChart = require('./percentageChart');
var HistogramChart = require('./histogramChart');
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
      classId: this.props.route.classId,
      lessonId: this.props.route.lessonId,
      feedbackOption: this.props.route.feedbackOption,
      height: height,
      width: width,
      socket: this.props.route.socket,
      studentThumbsData: {
        data: [],
        average: 0,
        lowest: 0,
        highest: 0
      },
      studentMultiChoiceData: {
        data: [],
        leader: 'N/A'
      }
    };

    this.state.socket.on('studentResponseForTeacher', (studentData) => {
      
      // MultiChoice case
      if(typeof studentData.answer === 'string') {
        var currentStudentMultiChoiceData = this.state.studentMultiChoiceData.data.slice();
        currentStudentMultiChoiceData.push(studentData.answer);
        
        var calculateLeader = (responses) => {
          var leader = [];

          responses.forEach(() => {
            //do this
          });

          return leader.sort();
        };

        var transformMultiChoiceData = (responses) => {
          var allResponses = {};

          responses.forEach((answer) => {
            allResponses[answer] = allResponses[answer] || 0;
            allResponses[answer]++;
          });

          return [allResponses['A'], allResponses['B'], allResponses['C'], allResponses['D']];
        }



        this.setState({
            studentMultiChoiceData : {
              data : currentStudentMultiChoiceData,
              leader: 'n/a'
            }
          }, () => {
            this.renderChart();
        });
      } else if(typeof studentData.answer === 'number'){
        // Thumbs check case
        var currentStudentThumbsData = this.state.studentThumbsData.data.slice();
        currentStudentThumbsData.push(studentData.answer);
        console.log(this.state.studentThumbsData);
        this.setState({
          studentThumbsData : {
            data : currentStudentThumbsData,
            lowest: currentStudentThumbsData.length ? Math.floor(currentStudentThumbsData.reduce((x,y) => {return x < y ? x : y})) : 0,
            average: currentStudentThumbsData.length ? Math.floor(currentStudentThumbsData.reduce((x,y) => {return x + y}) / currentStudentThumbsData.length) : 0,
            highest: currentStudentThumbsData.length ? Math.floor(currentStudentThumbsData.reduce((x,y) => {return x > y ? x : y})) : 0
          }
          }, () => {
            this.renderChart();
        });
        console.log(this.state.studentThumbsData);
      }
    });
  }

  exitPage() {
    // emit socket disconnect
    this.props.navigator.pop();
  }

  renderChart() {
    if(this.state.feedbackOption.id === 1) {
      return (
        <View style={{ width: this.state.width, height: this.state.height * 0.7, backgroundColor: 'red'}}>
          {React.createElement(PercentageChart, this.state.studentThumbsData)}
        </View>
      )
    } else if(this.state.feedbackOption.id === 2) {
      return (
        <View style={{ width: this.state.width, height: this.state.height * 0.7, backgroundColor: 'red'}}>
          {React.createElement(HistogramChart, this.state.studentMultiChoiceData)}
        </View>
      )
    }
  }

  render() {
    //need back/cancle button
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
          {this.renderChart.call(this)}
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