var React = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  Navigator
} = React;

class ClassStandbyView extends React.Component {
  constructor(props){ 
    super(props);
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topStyle: {
    flex: 1, 
    backgroundColor: '#ededed'
  },

  textSize: {
    fontSize : 20
  }
})
module.exports = ClassStandbyView;