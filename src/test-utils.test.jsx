import { fromJS } from 'immutable';

import { DEFAULT_STATE } from './constants';

export const TestComponent = () => (<div className="test">TestComponent content</div>);
TestComponent.displayName = 'TestComponentName';

export const TEST_INIT_TYPE = 'THIS-IS-A-TEST-TYPE-FOR-TEST';
export const TEST_INIT_ATTRIBUTE = 'THIS-IS-A-TEST-ATTRIBUTE';
export const TEST_INIT_VALUE = fromJS({ key: 'THIS-IS-A-TEST-VALUE' });

export const TEST_REDUCER = (state = DEFAULT_STATE, action) => {
  if (action && action.type) {
    switch (action.type) {
      case TEST_INIT_TYPE:
        return state.set(TEST_INIT_ATTRIBUTE, TEST_INIT_VALUE);

      default:
        return state;
    }
  } else {
    return state;
  }
};
