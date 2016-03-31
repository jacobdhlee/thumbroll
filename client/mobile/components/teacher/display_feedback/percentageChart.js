import React, { StyleSheet, View, Component, Text } from 'react-native';
var Progress = require('react-native-progress');
 
class PercentageChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      color: '',
      xLabels: ['Lowest', 'Average Student Response', 'Highest']
    }

  }


  componentWillReceiveProps(newData) {
    var updatedStudentData = [newData.lowest, newData.average / 100, newData.highest];
    var updatedColor;

    // Change color based on average response
    if(updatedStudentData[1] > 80) {
      updatedColor = '#66ff99';
    } else if(updatedStudentData[1] > 40) {
      updatedColor = '#fcfa8b';
    } else {
      updatedColor = '#ff4f4d';
    }
    this.setState({
      studentData : updatedStudentData,
      color: updatedColor,
      xLabels : ['Lowest', 'Average', 'Highest']
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Progress.Circle size={300} progress={this.state.studentData[1]} showsText={true} thickness={50} borderWidth={5} color={'#03a9f4'}/>
      </View>
    );
  }
}

const flag = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 40
  },
});

module.exports = PercentageChart;

