import { mount, shallow } from 'enzyme';
import React from 'react';

import moduleToTest from './error-boundary';

import filespace from './_.test';
import { ERROR_BOUNDARY_SUFFIX } from './constants';
import { TestComponent } from './test-utils.test';

describe(filespace(__filename), () => {
  it('is a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  it('wraps another component', () => {
    const BoundedComponent = moduleToTest(TestComponent);

    expect(BoundedComponent).to.have.property('displayName', `${TestComponent.displayName}${ERROR_BOUNDARY_SUFFIX}`);
  });

  it('has no errors initially', () => {
    const BoundedComponent = moduleToTest(TestComponent);
    const wrapper = shallow(<BoundedComponent />);
    expect(wrapper.state()).to.have.property('hasError', false);
  });

  it('renders bounded component when no errors', () => {
    const BoundedComponent = moduleToTest(TestComponent);
    const wrapper = mount(<BoundedComponent />);
    expect(wrapper.html()).to.equal('<div class="test">TestComponent content</div>');
  });

  it('detects component errors', () => {
    // eslint-disable-next-line no-unused-vars
    const Component = (props) => {
      throw new Error();
    };
    Component.displayName = TestComponent.displayName;

    const BoundedComponent = moduleToTest(Component);
    const wrapper = mount(<BoundedComponent />);
    expect(wrapper.html()).to.equal(`<h1 class="text-danger">*** REACT ERROR: ${TestComponent.displayName} ***</h1>`);
  });
});
