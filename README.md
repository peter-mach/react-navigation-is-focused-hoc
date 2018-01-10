![Please Star](http://pmachowski.github.io/ghh/images/please_star_project.jpg)

# react-navigation-is-focused-hoc [![npm version](https://badge.fury.io/js/react-navigation-is-focused-hoc.svg)](https://badge.fury.io/js/react-navigation-is-focused-hoc)

## Welcome React Navigation user seeking focus 😀

This is a quick, ready to use solution using HOC to expose `props.isFocused`. **No Redux needed**

## Installation

1. Install the latest version of `react-navigation`
2. Install the latest version of `react-navigation-is-focused-hoc` from npm
```
yarn add react-navigation-is-focused-hoc
```
or
```
npm install --save react-navigation-is-focused-hoc
```

## Full Usage Example

To see more of the `react-navigation-is-focused-hoc` in action, you can check out the source in [ExampleNavigation](https://github.com/pmachowski/react-navigation-is-focused-hoc/tree/master/ExampleNavigation) folder.

## Usage

**app.js**
```javascript
import React from 'react'
import { StackNavigator } from 'react-navigation'
import { updateFocus, getCurrentRouteKey } from 'react-navigation-is-focused-hoc'

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
          // If you want to ignore the state changed from `DrawerNavigator`, use this:
          /*
            if (/^Drawer(Open|Close|Toggle)$/.test(getCurrentRouteKey(currentState)) === false) {
              updateFocus(currentState)
              return
            }
          */
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
import PropTypes from 'prop-types'
import {
  View,
  Text,
} from 'react-native'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

class MyScreenView extends React.Component {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    focusedRouteKey: PropTypes.string.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      // screen enter (refresh data, update ui ...)
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      // screen exit
    }
  }

  shouldComponentUpdate(nextProps) {
    // Update only once after the screen disappears
    if (this.props.isFocused && !nextProps.isFocused) {
      return true
    }

    // Don't update if the screen is not focused
    if (!this.props.isFocused && !nextProps.isFocused) {
      return false
    }

    // Update the screen if its re-enter
    return !this.props.isFocused && nextProps.isFocused
  }

  render() {
    if (!this.props.isFocused /*&& this.props.focusedRouteKey.indexOf('Drawer') !== 0*/) {
      return null
    }

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

// second argument is optional and is for defining your initial route
// ie: export default withNavigationFocus(MyScreenView, true)
export default withNavigationFocus(MyScreenView)
```

Or with ES7 decorators:
 ```javascript
  @withNavigationFocus('MyScreenView')
  export default class MyScreenView extends React.Component {
    // ...
  }
```

------------
## Contributiors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/8849583?s=460&v=3" width="100px;"/><br /><sub><b>Peter Machowski</b></sub>](https://github.com/pmachowski)<br />| [<img src="https://avatars1.githubusercontent.com/u/4481570?s=460&v=3" width="100px;"/><br /><sub><b>Patrick Wozniak</b></sub>](https://patwoz.de/)<br />| [<img src="https://avatars2.githubusercontent.com/u/2672503?s=460&v=3" width="100px;"/><br /><sub><b>Charles Crete</b></sub>](https://github.com/Cretezy)<br />| [<img src="https://avatars0.githubusercontent.com/u/9060741?s=460&v=3" width="100px;"/><br /><sub><b>Ulises Giacoman</b></sub>](https://github.com/ugiacoman)<br />
<!-- ALL-CONTRIBUTORS-LIST:END -->

------------
## Special thanks

Thanks to Adam (@skevy), Mike (@grabbou), Satyajit (@satya164) and others for the `react-navigation` module
