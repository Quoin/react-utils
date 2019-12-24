import baseComponentName from './base-component-name';
import errorBoundary from './error-boundary';

export default (Component, getComponentProps, propTypes, defaultProps) => {
    const Container = (props) => <Component {...getComponentProps(props)} />;
    Container.displayName = `${baseComponentName(Component.displayName)}Container`;
    Container.propTypes = propTypes || Component.propTypes;
    Container.defaultProps = defaultProps || Component.defaultProps;
    return errorBoundary(Container);
};
