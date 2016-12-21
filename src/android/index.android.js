import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import CustomText from './aaa/CustomText.js'

class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomText/>
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
