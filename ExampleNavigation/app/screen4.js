import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
} from 'react-native';

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

import styles from './styles'

class Screen4 extends Component {
  static navigationOptions = {
    title: 'Screen 4',
  }

  componentDidMount() {
    console.log(`Screen 4 did Mount`)
  }

  componentWillUnmount() {
    console.log(`Screen 4 did Unmount`)
  }

  render() {
    const { navigate } = this.props.navigation

    console.log(`render() Screen 4 props.isFocused: ${this.props.isFocused}`)

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Screen 4!
        </Text>
        <Text style={styles.instructions}>
          {`To see props.isFocused in action\nopen dev menu and 'Debug JS Remotely'`}
        </Text>
        <View style={{marginBottom: 20}} />
        <Text style={styles.instructions}>
          This is the final screen. Now go back.
        </Text>
      </View>
    );
  }
}

export default withNavigationFocus(Screen4)
