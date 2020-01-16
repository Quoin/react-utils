import React from 'react';

import baseComponentName from './base-component-name';
import errorBoundary from './error-boundary';
import { IGetComponentProps } from './types';

export default (
  Component: React.Component,
  getComponentProps: IGetComponentProps,
  propTypes: object,
  defaultProps: object
): React.Component => {
    const Container = (props: object) => <Component {...getComponentProps(props)} />;
    Container.displayName = `${baseComponentName(Component.displayName)}Container`;
    Container.propTypes = propTypes || Component.propTypes;
    Container.defaultProps = defaultProps || Component.defaultProps;
    return errorBoundary(Container);
};
