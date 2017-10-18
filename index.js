import React from 'react'
import PropTypes from 'prop-types'

// subscribed components update functions
const subscribedComponents = []


function getCurrentRouteKey(navigationState) {
  if (!navigationState) return null
  const route = navigationState.routes[navigationState.index]
  if (route.routes) return getCurrentRouteKey(route)
  return route.key
}

function updateFocus(currentState) {
  const currentRouteKey = getCurrentRouteKey(currentState)
  subscribedComponents.forEach((f) => f(currentRouteKey))
}

function withNavigationFocus(WrappedComponent) {

  return class extends React.Component {
    static propTypes = {
      navigation: PropTypes.object.isRequired
    }

    static navigationOptions = (props) => {
      if (typeof WrappedComponent.navigationOptions === 'function') {
        return WrappedComponent.navigationOptions(props)
      }
      return { ...WrappedComponent.navigationOptions }
    }

    constructor(props) {
      super(props)
      this.state = {
        isFocused: true,
        focusedRouteKey: props.navigation.state.key,
      }
    }

    componentDidMount() {
      subscribedComponents.push(this._handleNavigationChange)
    }

    componentWillUnmount() {
      for (var i = 0; i < subscribedComponents.length; i++) {
        if (subscribedComponents[i] === this._handleNavigationChange) {
          subscribedComponents.splice(i, 1)
          break
        }
      }
    }

    _handleNavigationChange = (routeKey) => {
      // update state only when isFocused changes
      const currentScreenKey = this.props.navigation.state.key;
      if (this.state.isFocused !== (currentScreenKey === routeKey)) {
        this.setState({
          isFocused: currentScreenKey === routeKey,
          focusedRouteKey: routeKey
        })
      }
    }

    render() {
      return (
        <WrappedComponent
          isFocused={this.state.isFocused}
          focusedRouteKey={this.state.focusedRouteKey}
          {...this.props}
        />
      );
    }
  }
}

module.exports = {
  getCurrentRouteKey,
  withNavigationFocus,
  updateFocus,
}
