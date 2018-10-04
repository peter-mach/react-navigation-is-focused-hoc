import * as ReactNavigation from 'react-navigation'
import * as React from 'react'

declare module "react-navigation-is-focused-hoc" {
    export function updateFocus(currentState: ReactNavigation.NavigationState, prevState: ReactNavigation.NavigationState);
    export function getCurrentRouteKey(navigationState: ReactNavigation.NavigationState);
    export function withNavigationFocus(WrappedComponent: string, isInitialRoute?: boolean);
}

declare module 'react-navigation' {
    export interface NavigationScreenConfigProps {
        isFocused?: boolean;
        focusedRouteKey?: string;
        prevRouteName?: string;
    }
}
