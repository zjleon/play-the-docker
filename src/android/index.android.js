import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello, Worldjjksq</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 12,
  },
})

AppRegistry.registerComponent('androidApp', () => HelloWorld)
