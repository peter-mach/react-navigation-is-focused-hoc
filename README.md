![Please Star](http://pmachowski.github.io/ghh/images/please_star_project.jpg)

# react-navigation-is-focused-hoc [![npm version](https://badge.fury.io/js/react-navigation-is-focused-hoc.svg)](https://badge.fury.io/js/react-navigation-is-focused-hoc)

## Welcome React Navigation user seeking to focus 😀

This is a quick, ready to use solution using HOC to expose `props.isFocused`. **No Redux needed**

## Installation

Install the latest version of react-navigation from npm
```
yarn add react-navigation
```
or
```
npm install --save react-navigation
```

## Full Usage Example

To see more of the `react-navigation-is-focused-hoc` in action, you can check out the source in [ExampleNavigation](https://github.com/pmachowski/react-navigation-is-focused-hoc/tree/master/ExampleNavigation) folder.

## Usage

**app.js**
```javascript
import React from 'react'
import { StackNavigator } from 'react-navigation'
import { updateFocus } from 'react-navigation-is-focused-hoc'

import MyScreenView from './screens/myScreenView'

// navigation
const AppNavigator = StackNavigator({
  MyScreenView: { screen: MyScreenView },
}, {
  initialRouteName: 'MyScreenView',
})

export default class App extends React.Component {

  render() {
    return (
      <AppNavigator
        onNavigationStateChange={(prevState, currentState) => {
          updateFocus(currentState)
        }}
      />
    )
  }
}
```

**myScreenView.js**
```javascript
import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

class MyScreenView extends React.Component {

  render() {
    return (
      <View>
        {this.props.isFocused
          ? <Text>I am focused</Text>
          : <Text>I am not focused</Text>
        }
      </View>
    )
  }
}

// second argument is the route name specified during StackNavigator initialization.
export default withNavigationFocus(MyScreenView, 'MyScreenView')
```


------------

Thanks to Adam (@skevy), Mike (@grabbou), Satyajit (@satya164) and others for the `react-navigation` module
