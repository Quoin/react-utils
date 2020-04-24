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

export default (Component) => {
  const componentName = baseComponentName(Component.displayName || 'Anonymous');

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: Boolean(error) };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      // eslint-disable-next-line no-console
      console.error(
        `${ErrorBoundary.displayName}.componentDidCatch():`,
        'error=', error,
        'errorInfo=', errorInfo && errorInfo.componentStack,
      );
    }

    render() {
      const { hasError } = this.state;
      if (hasError) {
        return (
          <h1 className="text-danger">
            *** REACT ERROR:
            {' '}
            {componentName}
            {' '}
            ***
          </h1>
        );
      }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...this.props} />;
    }
  }

  ErrorBoundary.displayName = `${componentName}${ERROR_BOUNDARY_SUFFIX}`;
  ErrorBoundary.propTypes = Component.propTypes;
  ErrorBoundary.defaultProps = Component.defaultProps;

  return ErrorBoundary;
};
