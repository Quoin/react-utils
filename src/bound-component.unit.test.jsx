import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import moduleToTest from './bound-component';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 4 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(5);
  });

  describe('BoundComponent', () => {
    const Component = ({
      existing,
      foo,
      some,
    }) => (
      <div>
        got foo:
        {foo}
        ,
        some:
        {some}
        ,
        existing:
        {existing}
      </div>
    );
    Component.displayName = 'FooBar';
    Component.propTypes = {
      existing: PropTypes.string,
      foo: PropTypes.string.isRequired,
      some: PropTypes.string.isRequired,
    };
    Component.defaultProps = {
      existing: 'not really',
    };

    const getComponentProps = (props) => ({
      foo: 'bar',
      some: 'props',
      existing: props.existing,
    });

    it('returns a component', () => {
      const BoundComponent = moduleToTest(Component, getComponentProps);

      expect(BoundComponent).to.be.a('function');
      expect(BoundComponent).to.have.property('displayName', 'FooBarContainerErrorBoundary');
      expect(BoundComponent).to.have.property('propTypes');
      expect(BoundComponent).to.have.property('defaultProps');
    });

    it('renders with default values', () => {
      const BoundComponent = moduleToTest(Component, getComponentProps);
      const wrapper = mount(<BoundComponent />);
      expect(wrapper.html()).to.equal('<div>got foo:bar, some:props, existing:not really</div>');
    });

    it('renders with value for \'existing\'', () => {
      const BoundComponent = moduleToTest(Component, getComponentProps);
      const wrapper = mount(<BoundComponent {...getComponentProps({ existing: 'Yes it does' })} />);
      expect(wrapper.html()).to.equal('<div>got foo:bar, some:props, existing:Yes it does</div>');
    });

    it('uses baseDisplayName passed', () => {
      const BoundComponent = moduleToTest(Component, getComponentProps, null, null, 'OtherFoo');
      expect(BoundComponent).to.have.property('displayName', 'OtherFooContainerErrorBoundary');
    });
  });
});
