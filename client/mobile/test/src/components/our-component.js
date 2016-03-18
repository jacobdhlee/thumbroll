
import React from "react-native";

const {
  View,
  Text
} = React;

class OurComponent extends React.Component {
  render() {
    <View>
    {this.props.items.map((item) => (
      <View>
        <Text>{item.name}</Text>
      </View>
    ))}
    </View>
  }
}
