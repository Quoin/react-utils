import { mount, shallow } from 'enzyme';

import { ERROR_BOUNDARY_SUFFIX } from './constants';
import TestComponent, { DISPLAY_NAME } from './test-component.test';

import moduleToTest from './error-boundary';

describe(`src/error-boundary`, () => {
    it(`is a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`wraps another component`, () => {
        const BoundedComponent = moduleToTest(TestComponent);

        expect(BoundedComponent).to.have.property('displayName', `${DISPLAY_NAME}${ERROR_BOUNDARY_SUFFIX}`);
    });

    it(`has no errors initially`, () => {
        const BoundedComponent = moduleToTest(TestComponent);
        const wrapper = shallow(<BoundedComponent />);
        expect(wrapper.state()).to.have.property('hasError', false);
    });

    it(`renders bounded component when no errors`, () => {
        const BoundedComponent = moduleToTest(TestComponent);
        const wrapper = mount(<BoundedComponent />);
        expect(wrapper.html()).to.equal(`<div class="test">TestComponent content</div>`);
    });

    it.skip(`detects component errors - TODO`, () => {});
});
