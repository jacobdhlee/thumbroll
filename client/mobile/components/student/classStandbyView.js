var React = require('react-native');
var ThumbCheck =  require('./responses/thumbCheck.js');
var MultiChoice =  require('./responses/multiChoice.js');

var {
  Text,
  StyleSheet,
  View,
  Navigator
} = React;

class ClassStandbyView extends React.Component {
  constructor(props){ 
    super(props);
    //socket.on()
  }

  thumbcheckPage() {
    this.props.navigator.push({
      component: ThumbCheck,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }
  multiPage() {
    this.props.navigator.push({
      component: MultiChoice,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }
  thumbcheckPage() {
    this.props.navigator.push({
      component: ThumbCheck,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }
  

  previousSection() {
    this.props.navigator.pop();
  }

  render(){
    return(
      <View style={styles.topStyle}>
        <View>
         <Text style={styles.textSize}>{this.props.route.className}</Text>
        </View>
        <View>
         <Text style={styles.textSize} onPress={this.previousSection.bind(this)}>Go Back</Text>
        </View>
        <View>
          <Text onPress={this.thumbcheckPage.bind(this)} >ThumbCheck</Text>
        </View>
        <View>
          <Text onPress={this.multiPage.bind(this)} >MutipleChoice</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topStyle: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed'
  },

  textSize: {
    fontSize : 20
  }
})
module.exports = ClassStandbyView;
