import React, { StyleSheet, View, Component } from 'react-native';
import RNChart from 'react-native-chart';

 
class HistogramChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      transformedData: [],
      xLabels: ['A', 'B', 'C', 'D']
    }
  }


  componentWillReceiveProps(newData) {
    var updatedStudentData = newData.data;

    this.setState({
      studentData : updatedStudentData,
      transformedData: transformMultiChoiceData(updatedStudentData),
      color: '#219dff'
    });
    
    var displayData = transformMultiChoiceData(updatedStudentData);
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

var transformMultiChoiceData = (responses) => {
  var allResponses = {};

  responses.forEach((answer) => {
    allResponses[answer] = allResponses[answer] || 0;
    allResponses[answer]++;
  });

  return [allResponses['A'] || 0, allResponses['B'] || 0, allResponses['C'] || 0, allResponses['D'] || 0];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    position: 'absolute',
    top: 15,
    left: 15,
    bottom: 4,
    right: 15,
  }
});

module.exports = HistogramChart;

