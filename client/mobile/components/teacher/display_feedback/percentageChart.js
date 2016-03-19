import React, { StyleSheet, View, Component } from 'react-native';
import RNChart from 'react-native-chart';

 
class PercentageChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      chartData: [
        {
          name: 'BarChart',
          type: 'bar',
          color: '#219dff',
          widthPercent: 1,
          data: [],
        }
      ],
      xLabels: ['Average Student Response']
    }

  }


  componentWillReceiveProps(newData) {
    updatedStudentData = newData.average;
    var updatedColor;

    // Change color based on average response
    if(updatedStudentData[0] > 80) {
      updatedColor = '#66ff99';
    } else if(updatedStudentData[0] > 40) {
      updatedColor = '#fcfa8b';
    } else {
      updatedColor = '#ff4f4d';
    }
    this.setState({
      studentData : updatedStudentData,
      color: updatedColor
    });
    return (
      <View style={styles.container}>
        <RNChart style={styles.chart}
          chartData={[{
          name: 'BarChart',
          type: 'bar',
          color: this.state.color,
          widthPercent: .5,
          data: newData.average,
        }]}
          verticalGridStep={5}
          xLabels={['Average Student Response']}
         />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNChart style={styles.chart}
          chartData={[{
          name: 'BarChart',
          type: 'bar',
          color: this.state.color,
          widthPercent: .5,
          data: this.state.studentData
        }]}
          verticalGridStep={5}
          xLabels={this.state.xLabels}
         />
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
  },
  chart: {
    position: 'absolute',
    top: 15,
    left: 15,
    bottom: 4,
    right: 15,
  }
});

module.exports = PercentageChart;

