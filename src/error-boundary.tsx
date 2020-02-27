/**
 *  There are no hooks yet for `componentDidCatch` so we have to use the old
 *  lifecycle.
 *  https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 *
 *  Taken from https://reactjs.org/docs/error-boundaries.html
 */

import React from 'react';

import baseComponentName from './base-component-name';
import { ERROR_BOUNDARY_SUFFIX } from './constants';

interface InnerState {
  hasError: boolean;
}

export default (Component: React.ComponentType<any>): React.ComponentType<any> => {
    const componentName = baseComponentName(Component.displayName || 'Anonymous');

    class ErrorBoundary extends React.Component<any, InnerState> {
    static displayName = `${componentName}${ERROR_BOUNDARY_SUFFIX}`;
    static propTypes = Component.propTypes;
    static defaultProps = Component.defaultProps;

    constructor(props?: object) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error?: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: Boolean(error) };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error(
            `${ErrorBoundary.displayName}.componentDidCatch():`,
            `error=`, error,
            `errorInfo=`, errorInfo && errorInfo.componentStack
        );
    }

    render() {
        if (this.state.hasError) {
            return <h1 className="text-danger">*** REACT ERROR: {componentName} ***</h1>;
        } else {
            return <Component { ...this.props } />;
        }
    }
    }

    return ErrorBoundary;
};
