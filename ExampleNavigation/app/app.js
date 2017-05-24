import React, { Component } from 'react'
import {
  View,
  StatusBar,
} from 'react-native';
import { StackNavigator } from 'react-navigation'

// import update function from react-navigation-is-focused-hoc
import { updateFocus } from 'react-navigation-is-focused-hoc'

import styles from './styles'

import Screen1 from './screen1'
import Screen2 from './screen2'
import Screen3 from './screen3'
import Screen4 from './screen4'

  // navigation
const AppNavigator = StackNavigator({
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 },
  Screen3: { screen: Screen3 },
  Screen4: { screen: Screen4 },
}, {
  initialRouteName: 'Screen1',
})

export default class App extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          animated
          hidden
        />
        <AppNavigator
          onNavigationStateChange={(prevState, currentState) => {
            console.log('onNavigationStateChange()')
            // update HOC state
            updateFocus(currentState)
          }}
        />
      </View>
    )
  }
}
