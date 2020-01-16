/**
 *  There are no hooks yet for `componentDidCatch` so we have to use the old
 *  lifecycle.
 *  https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 *
 *  Taken from https://reactjs.org/docs/error-boundaries.html
 */

import BaseClassComponent from './base-class-component';
import baseComponentName from './base-component-name';
import { ERROR_BOUNDARY_SUFFIX } from './constants';
import { BaseError } from './types';

interface InnerState {
  hasError: boolean;
}

export default (Component: BaseClassComponent<any, any>): BaseClassComponent<any, any> => {
    const componentName = baseComponentName(Component.displayName);

  class ErrorBoundary extends BaseClassComponent<any, InnerState> {
    static displayName = `${componentName}${ERROR_BOUNDARY_SUFFIX}`;
    static propTypes = Component.propTypes;
    static defaultProps = Component.defaultProps;

        constructor(props?: object) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(error?: BaseError) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
        }

        componentDidCatch(error: BaseError, errorInfo) {
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
