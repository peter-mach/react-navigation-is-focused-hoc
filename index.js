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

function getRouteName(navigationState) {
  if (!navigationState) return null
  const route = navigationState.routes[navigationState.index]
  if (route.routes) return getRouteName(route)
  return route.routeName
}

function updateFocus(currentState, prevState) {
  const currentRouteKey = getCurrentRouteKey(currentState);
  const prevRouteName = getRouteName(prevState);
  subscribedComponents.forEach((f) => f(currentRouteKey, prevRouteName))
}


function _bind(WrappedComponent, isInitialRoute) {
  class WithNavigationFocus extends React.Component {

    static propTypes = {
      navigation: PropTypes.object.isRequired,
    }

    static navigationOptions = (props) => {
      if (typeof WrappedComponent.navigationOptions === 'function') {
        return WrappedComponent.navigationOptions(props)
      }
      return { ...WrappedComponent.navigationOptions }
    }

    isFocused = !!isInitialRoute
    state = {
      isFocused: !!isInitialRoute
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

    _handleNavigationChange = (routeKey, prevRouteName) => {
      // update state only when isFocused changes
      const currentScreenKey = this.props.navigation.state.key;

      // when handling a navigation action that has nested actions, this method
      // will be called twice or more. in this case, a later call may not see a
      // change to this.state.isFocused even if this.setState already ran, since
      // React batches updates. so we need to check a local variable that
      // immediately reflects any changes.
      if (this.isFocused !== (currentScreenKey === routeKey)) {
        this.setState({
          isFocused: !this.isFocused,
          focusedRouteKey: routeKey,
          prevRouteName: prevRouteName
        })
        this.isFocused = !this.isFocused
      }
    }

    render() {
      return (
        <WrappedComponent
          isFocused={this.state.isFocused}
          focusedRouteKey={this.state.focusedRouteKey}
          prevRouteName={this.state.prevRouteName}
          {...this.props}
        />
      )
    }
  }

  WithNavigationFocus.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  return WithNavigationFocus
}

function withNavigationFocus(WrappedComponent, isInitialRoute) {
  if (typeof WrappedComponent === 'function') { // standard HOC
    return _bind(WrappedComponent, isInitialRoute)
  } else {// ES7 decorator
    isInitialRoute = WrappedComponent
    return (WrappedComponent) => _bind(WrappedComponent, isInitialRoute)
  }
}

export { getCurrentRouteKey, withNavigationFocus, updateFocus }
