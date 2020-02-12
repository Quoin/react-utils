import { fromJS } from 'immutable';

import actionCreator from './action-creator';
import { IAction, IState } from './types';

import moduleToTest from './guard-action';

const TEST_ACTION = `GUARD_ACTION_TYPE`;
const TEST_ATTRIBUTE = `GUARD_ACTION_ATTRIBUTE`;
const TEST_VALUE = fromJS({ 'GUARD_ACTION_VALUE': 'GUARD_ACTION_VALUE' });

const TEST_REDUCER = (state: IState, action?: IAction): IState => state.set(TEST_ATTRIBUTE, TEST_VALUE);

describe(`src/guard-action`, () => {
    it(`is a function with 2 params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
    });

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
