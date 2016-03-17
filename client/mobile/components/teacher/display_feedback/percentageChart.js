import React, { StyleSheet, View, Component } from 'react-native';
import RNChart from 'react-native-chart';

 
class PercentageChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : this.props.mock
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNChart style={styles.chart}
          chartData={chartData}
          verticalGridStep={5}
          xLabels={xLabels}
         />
      </View>
    );
  }
}

console.log(this.state);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  chart: {
    position: 'absolute',
    top: 16,
    left: 4,
    bottom: 4,
    right: 16,
  }
});
 
const chartData = [
  {
    name: 'BarChart',
    type: 'bar',
    color: '#219dff',
    widthPercent: 0.6,
    data: [10, 12, 14, 25, 31, 52, 41, 31, 52, 66, 22, 11]
  },
  {
    name: 'LineChart',
    color: '#ededed',
    lineWidth: 2,
    highlightIndices: [1, 2, 6, 9], // The data points at indexes 1 and 2 will be orange 
    highlightColor: 'orange',
    showDataPoint: true,
    data: [10, 12, 14, 25, 31, 52, 41, 31, 52, 66, 22, 11],
  }
];
 
const xLabels = ['0','1','2','3','4','5','6','7','8','9','10','11'];

module.exports = PercentageChart;