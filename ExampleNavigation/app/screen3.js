import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
} from 'react-native';

import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'

import styles from './styles'

class Screen3 extends Component {
  static navigationOptions = {
    title: 'Screen 3',
  }

  componentDidMount() {
    console.log(`Screen 3 did Mount`)
  }

  componentWillUnmount() {
    console.log(`Screen 3 did Unmount`)
  }

  render() {
    const { navigate } = this.props.navigation

    console.log(`render() Screen 3 props.isFocused: ${this.props.isFocused}`)

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Screen 3!
        </Text>
        <Text style={styles.instructions}>
          {`To see props.isFocused in action\nopen dev menu and 'Debug JS Remotely'`}
        </Text>
        <Button style={styles.goButton}
          title="Continue"
          onPress={() => navigate('Screen4')}
        />
      </View>
    );
  }
}

export default withNavigationFocus(Screen3)
