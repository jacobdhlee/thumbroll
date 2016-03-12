var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
} = React;

class MultiChoice extends React.Component {
  constructor (props){
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfHeight}>
          <Text>MultiChoice</Text>
        </View>
        <View style={styles.quarterHeight}>
          <Text>A</Text>
        </View>
        <View style={styles.quarterHeight2}>
          <Text>B</Text>
        </View>
        <View style={styles.quarterHeight3}>
          <Text>C</Text>
        </View>
        <View style={styles.quarterHeight4}>
          <Text>D</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  halfHeight: {
    flex: .2, 
    backgroundColor: '#FF3366'
  },
  quarterHeight: {
    flex: .2,
    backgroundColor: '#70D1C1'
  },
  quarterHeight2: {
    flex: .2,
    backgroundColor: '#69C4B5'
  },
  quarterHeight3: {
    flex: .2,
    backgroundColor: '#61B5A7'
  },
  quarterHeight4: {
    flex: .2,
    backgroundColor: '#5AA89B'
  },
})
module.exports = MultiChoice;