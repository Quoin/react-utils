import { fromJS } from 'immutable';

import actionCreator from './action-creator';
import { IAction, IState, IReducer } from './types';

import moduleToTest from './guard-action';
import { DEFAULT_STATE } from './constants'

const TEST_ACTION = `GUARD_ACTION_TYPE`;
const TEST_ATTRIBUTE = `GUARD_ACTION_ATTRIBUTE`;
const TEST_VALUE = fromJS({ 'GUARD_ACTION_VALUE': 'GUARD_ACTION_VALUE' });

const TEST_REDUCER: IReducer = (state: IState = DEFAULT_STATE, action: IAction): IState => state.set(TEST_ATTRIBUTE, TEST_VALUE);

describe(`src/guard-action`, () => {
    it(`calls the reducer when defined in list`, () => {
        const reducer = moduleToTest(TEST_REDUCER, [ 'foo', TEST_ACTION, 'bar' ]);
        const state = reducer(fromJS({}), actionCreator(TEST_ACTION));
        expect(state).to.equal(fromJS({
            [TEST_ATTRIBUTE]: TEST_VALUE
        }));
    });

    it(`doesn't call reducer when not in list`, () => {
        const reducer = moduleToTest(TEST_REDUCER, [ 'foo', 'bar' ]);
        const state = reducer(fromJS({}), actionCreator(TEST_ACTION));
        expect(state).to.equal(fromJS({}));
    });
});
