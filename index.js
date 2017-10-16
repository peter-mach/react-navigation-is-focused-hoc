import React from 'react'

// subscribed components update functions
let subscribedComponents = []


function _getCurrentRouteKey(navigationState) {
  if (!navigationState) return null
  const route = navigationState.routes[navigationState.index]
  if (route.routes) return _getCurrentRouteKey(route)
  return route.key
}

function updateFocus(currentState) {
  const currentRouteKey = _getCurrentRouteKey(currentState)
  subscribedComponents.forEach((f) => f(currentRouteKey))
}

function withNavigationFocus(WrappedComponent) {

  return class extends React.Component {
    static navigationOptions = (props) => {
      if (typeof WrappedComponent.navigationOptions === 'function') {
        return WrappedComponent.navigationOptions(props)
      }
      return { ...WrappedComponent.navigationOptions }
    }

    constructor(props) {
      super(props)
      this.state = {
        isFocused: true
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
          isFocused: currentScreenKey === routeKey
        })
      }
    }

    render() {
      return <WrappedComponent isFocused={this.state.isFocused} {...this.props} />
    }
  }
}

module.exports = {
  withNavigationFocus,
  updateFocus,
}
