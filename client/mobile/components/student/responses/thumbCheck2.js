var React = require('react-native');
var Slider = require('react-native-slider');
var Progress = require('react-native-progress');

var {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions
} = React;

class ThumbCheck2 extends React.Component {
  constructor(props) {
    super(props)
    var {height, width} = Dimensions.get('window');
    this.width = width;
    this.circleSize = 200;
    this._panResponder = {};
    this.circleCenter = {};
    // this.circleCenter = {x: this.width/2, y:0};

    this.state = {
      value: 0,
    };
  }

  componentWillMount() {
    console.log('about to mount');
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.refs.circle.measure( (fx, fy, width, height, px, py) => {
          this.circleCenter.y = py + this.circleSize / 2;
          this.circleCenter.x = width / 2;
          console.log(this.circleCenter);
        }); 
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log('MOVEMENT!:',gestureState.x0, gestureState.y0, gestureState.moveX, gestureState.moveY);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  valueChange(value) {
    this.setState({value: Math.floor(value)})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View ref='circle' style={{alignItems: 'center', padding:20}}>
          <Progress.Circle size={this.circleSize} progress={this.state.value / 100} showsText={true}
            {...this._panResponder.panHandlers}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
});

module.exports = ThumbCheck2;



