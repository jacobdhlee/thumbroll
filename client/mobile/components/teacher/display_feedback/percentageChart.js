import React, { StyleSheet, View, Component } from 'react-native';
import RNChart from 'react-native-chart';

 
class PercentageChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : this.props.mock,
      chartData: [
        {
          name: 'BarChart',
          type: 'bar',
          color: '#219dff',
          widthPercent: 0.6,
          data: [10, 12, 14, 25]
        },
        {
          name: 'LineChart',
          color: '#ededed',
          lineWidth: 2,
          highlightIndices: [1, 2, 6, 9], // The data points at indexes 1 and 2 will be orange 
          highlightColor: 'orange',
          showDataPoint: true,
          data: [10, 12, 14, 25],
        }
      ],
      xLabels: ['0','1','2','3']
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <RNChart style={styles.chart}
          chartData={this.state.chartData}
          verticalGridStep={5}
          xLabels={this.state.xLabels}
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
    backgroundColor: 'white',
  },
  chart: {
    position: 'absolute',
    top: 16,
    left: 4,
    bottom: 4,
    right: 16,
  }
});

module.exports = PercentageChart;

