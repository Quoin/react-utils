/**
 *  There are no hooks yet for `componentDidCatch` so we have to use the old
 *  lifecycle.
 *  https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 *
 *  Taken from https://reactjs.org/docs/error-boundaries.html
 */

import baseComponentName from './base-component-name';
import { ERROR_BOUNDARY_SUFFIX } from './constants';

export default (Component) => {
    const componentName = baseComponentName(Component.displayName);

    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
        }

        componentDidCatch(error, errorInfo) {
            // You can also log the error to an error reporting service
            console.error(
                `${ErrorBoundary.displayName}.componentDidCatch():`,
                `error=`, error,
                `errorInfo=`, (errorInfo && errorInfo.componentStack) ? errorInfo.componentStack : errorInfo
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

    ErrorBoundary.displayName = `${componentName}${ERROR_BOUNDARY_SUFFIX}`;
    ErrorBoundary.propTypes = Component.propTypes;
    ErrorBoundary.defaultProps = Component.defaultProps;

    return ErrorBoundary;
};
