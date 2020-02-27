import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import moduleToTest from './bound-component';

const React = require('react');

describe(`src/bound-component`, () => {
    it(`exports a function with 4 params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(4);
    });

    describe(`BoundComponent`, () => {
      interface Props {
        existing: string;
        foo: string;
        some: string;
      }

      const Component: FunctionComponent<Props> = (props) => <div>got foo:{props.foo}, some:{props.some}, existing:{props.existing}</div>;
      Component.displayName = 'FooBar';
      Component.propTypes = {
          existing: PropTypes.string.isRequired,
          foo: PropTypes.string.isRequired,
          some: PropTypes.string.isRequired
      };
      Component.defaultProps = {
          existing: 'not really'
      };

      const getComponentProps = (props: any): object => ({
          foo: 'bar',
          some: 'props',
          existing: props.existing
      });

      it(`returns a component`, () => {
          const BoundComponent = moduleToTest(Component, getComponentProps);

          expect(BoundComponent).to.be.a('function');
          expect(BoundComponent).to.have.property('displayName', 'FooBarContainerErrorBoundary');
          expect(BoundComponent).to.have.property('propTypes');
          expect(BoundComponent).to.have.property('defaultProps');
      });

      it(`renders with default values`, () => {
          const BoundComponent = moduleToTest(Component, getComponentProps);
          const wrapper = mount(<BoundComponent />);
          expect(wrapper.html()).to.equal('<div>got foo:bar, some:props, existing:not really</div>');
      });

      it(`renders with value for 'existing'`, () => {
          const BoundComponent = moduleToTest(Component, getComponentProps);
          const wrapper = mount(<BoundComponent {...getComponentProps({ existing: "Yes it does" })} />);
          expect(wrapper.html()).to.equal('<div>got foo:bar, some:props, existing:Yes it does</div>');
      });
    });
});
