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
          widthPercent: 0.6,
          data: [],
        },
        // {
        //   name: 'LineChart',
        //   color: '#ededed',
        //   lineWidth: 2,
        //   highlightIndices: [1, 2, 6, 9], // The data points at indexes 1 and 2 will be orange 
        //   highlightColor: 'orange',
        //   showDataPoint: true,
        //   data: [10, 12, 14, 25],
        // }
      ],
      xLabels: ['0','1','2','3']
    }

  }

  // componentWillUpdate() {
  //   console.log('yup!');
  //   if(this.props.data.length === 1 && flag) {
  //     flag = false;
  //     updatedStudentData = this.state.chartData.slice();
  //     updatedChartData[0].data = this.props.data;
  //     this.setState({
  //       chartData : updatedChartData
  //     });
  //     return (
  //       <View style={styles.container}>
  //         {console.log(this.props.data)}  
  //         <RNChart style={styles.chart}
  //           chartData={this.state.chartData}
  //           verticalGridStep={5}
  //           xLabels={this.state.xLabels}
  //          />
  //       </View>
  //     );
  //   }
  // }

  componentWillReceiveProps(newData) {
    console.log(this.state.studentData);
    updatedStudentData = Array.isArray(this.state.studentData.length) === true ? this.state.studentData.data.slice() : this.state.studentData;
    updatedStudentData = newData;
    this.setState({
      studentData : updatedStudentData
    });
    return (
      <View style={styles.container}>
        {console.log(newData)}  
        <RNChart style={styles.chart}
          chartData={[{
          name: 'BarChart',
          type: 'bar',
          color: '#219dff',
          widthPercent: 0.6,
          data: newData.data,
        }]}
          verticalGridStep={5}
          xLabels={['0','1','2','3']}
         />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
      {console.log(this.state.studentData)}
        <RNChart style={styles.chart}
          chartData={[{
          name: 'BarChart',
          type: 'bar',
          color: '#219dff',
          widthPercent: 0.6,
          data: this.state.studentData.data
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
    top: 16,
    left: 4,
    bottom: 4,
    right: 16,
  }
});

module.exports = PercentageChart;

