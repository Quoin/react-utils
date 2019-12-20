
export const TestComponent = (props) => `<div class="test">TestComponent content</div>`;
TestComponent.displayName = `TestComponentName`;

export const TEST_INIT_TYPE = 'THIS-IS-A-TEST-TYPE-FOR-TEST';
export const TEST_INIT_ATTRIBUTE = 'THIS-IS-A-TEST-ATTRIBUTE';
export const TEST_INIT_VALUE = 'THIS-IS-A-TEST-VALUE';

export const TEST_REDUCER = (state, action) => {
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

