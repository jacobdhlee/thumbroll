var React = require('react-native');
var ThumbCheck =  require('./responses/thumbCheck.js');
var MultiChoice =  require('./responses/multiChoice.js');
var NavBar = require('./../shared/navbar');

var {
  Text,
  StyleSheet,
  View,
  Navigator
} = React;

class ClassStandbyView extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      socket: this.props.route.socket,
      userId: this.props.route.userId,
      class: this.props.route.class
    };
    var that = this;
    this.state.socket.on('teacherConnect', () => {
      console.log('Class is in sesson');
    });

    this.state.socket.on('newPoll', function(pollInfo) {
      console.log('message received from server!', pollInfo);
      if(pollInfo.pollObject.id == 1) {
        that.thumbcheckPage(pollInfo);
      } else if(pollInfo.pollObject.id == 2) {
        that.multiPage(pollInfo);
      }
    });
  }

  thumbcheckPage(pollInfo) {
    this.props.navigator.push({
      component: ThumbCheck,
      pollInfo: pollInfo,
      userId: this.state.userId,
      socket: this.state.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }

  multiPage(pollInfo) {
    this.props.navigator.push({
      component: MultiChoice,
      pollInfo: pollInfo,
      userId: this.state.userId,
      socket: this.state.socket,
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    })
  }

  logout(){
    this.props.navigator.popToTop();
  }

  previousSection() {
    this.state.socket.emit('studentLeavingClass', {userId: this.state.userId, classId:this.state.class.id});
    this.props.navigator.pop();
  }

  render(){
    return(
      <View>
        <View>
          <NavBar onBack={this.previousSection.bind(this)} onOut={this.logout.bind(this)}>Enrollled Classes</NavBar>
        </View>
        <View>
         <Text style={styles.textSize}>{this.state.class.name}</Text>
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
