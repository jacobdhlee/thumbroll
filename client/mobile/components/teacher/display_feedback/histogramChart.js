import React, { StyleSheet, View, Component, Animated } from 'react-native';
 
class HistogramChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      transformedData: [],
      animators: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],       
      xLabels: ['A', 'B', 'C', 'D']
    }
  }


  componentWillReceiveProps(newData) {
    var updatedStudentData = newData.data;

    this.setState({
      studentData : updatedStudentData,
      transformedData: transformMultiChoiceData(updatedStudentData),
    });
    
    var displayData = transformMultiChoiceData(updatedStudentData);
    var total = displayData.reduce((a,b) => {return a + b});
    for(var i = 0 ; i < displayData.length; i++) {
      Animated.timing(      
        this.state.animators[i],
        {toValue: displayData[i] / total},      
      ).start();   
    }
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

