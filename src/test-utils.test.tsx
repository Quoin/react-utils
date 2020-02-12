import { fromJS } from 'immutable';
import React from 'react';

import { DEFAULT_STATE } from './constants';
import { IAction, IState } from './types';

export const TestComponent: React.FunctionComponent<any> = (props) => (<div className="test">TestComponent content</div>);
TestComponent.displayName = `TestComponentName`;

export const TEST_INIT_TYPE = 'THIS-IS-A-TEST-TYPE-FOR-TEST';
export const TEST_INIT_ATTRIBUTE = 'THIS-IS-A-TEST-ATTRIBUTE';
export const TEST_INIT_VALUE = fromJS({ key: 'THIS-IS-A-TEST-VALUE' });

export const TEST_REDUCER = (state: IState = DEFAULT_STATE, action: IAction): IState => {
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
