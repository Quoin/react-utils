import baseComponentName from './base-component-name';
import errorBoundary from './error-boundary';

export default (
  Component,
  getComponentProps,
  propTypes,
  defaultProps,
) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Container = (props) => <Component {...getComponentProps(props)} />;
  Container.displayName = `${baseComponentName(Component)}Container`;
  Container.propTypes = propTypes || Component.propTypes;
  Container.defaultProps = defaultProps || Component.defaultProps;
  return errorBoundary(Container);
};
