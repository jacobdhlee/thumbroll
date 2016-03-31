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
    this.chartHeight = 400;
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

  renderBars (data) {
    var height = this.chartHeight;
    return data.map((answer, index) => {
        return (
          <View style={{padding:10, margin:10}}>
            <View >
              <Animated.View style={{
                width:20, backgroundColor:'white', 
                height:this.state.animators[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0]  
                })
              }} />
              <Animated.View style={{
                width:20, backgroundColor:'blue', 
                height:this.state.animators[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height]  
                })
              }} />
            </View>
            <View>
              <Text> {this.state.xLabels[index]} </Text>
            </View>
          </View>
        )
    })
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

