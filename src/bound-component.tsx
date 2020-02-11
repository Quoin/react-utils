import React from 'react';

import baseComponentName from './base-component-name';
import errorBoundary from './error-boundary';
import { IGetComponentProps } from './types';

export default (
  Component: React.ComponentType<any>,
  getComponentProps: IGetComponentProps,
  propTypes?: object,
  defaultProps?: object
): React.ComponentClass => {
  const Container: React.FunctionComponent<any> = (props) => <Component {...getComponentProps(props)} />;
    Container.displayName = `${baseComponentName(Component)}Container`;
    Container.propTypes = propTypes ? propTypes : Component.propTypes;
    Container.defaultProps = defaultProps ? defaultProps : Component.defaultProps;
    return errorBoundary(Container);
};
