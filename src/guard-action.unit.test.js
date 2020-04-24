import { fromJS } from 'immutable';

import actionCreator from './action-creator';
import { DEFAULT_STATE } from './constants';

import moduleToTest from './guard-action';

const INITIAL_STATE = fromJS({ some: 'thing' });
const TEST_ACTION = 'GUARD_ACTION_TYPE';
const TEST_ATTRIBUTE = 'GUARD_ACTION_ATTRIBUTE';
const TEST_VALUE = fromJS({ GUARD_ACTION_VALUE: 'GUARD_ACTION_VALUE' });

// eslint-disable-next-line no-unused-vars
const TEST_REDUCER = (state = DEFAULT_STATE, action) => state.set(TEST_ATTRIBUTE, TEST_VALUE);

describe('src/guard-action', () => {
  it('exports a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  it('returns initial state when no reducer.', () => {
    const reducer = moduleToTest();
    const state = reducer(INITIAL_STATE, actionCreator(TEST_ACTION));
    expect(state).to.equal(INITIAL_STATE);
  });

  it('returns initial state when no actionTypes', () => {
    const reducer = moduleToTest(TEST_REDUCER);
    const state = reducer(INITIAL_STATE, actionCreator(TEST_ACTION));
    expect(state).to.equal(INITIAL_STATE);
  });

  it('returns initial state when empty actionTypes', () => {
    const reducer = moduleToTest(TEST_REDUCER, []);
    const state = reducer(INITIAL_STATE, actionCreator(TEST_ACTION));
    expect(state).to.equal(INITIAL_STATE);
  });

  it('doesn\'t call reducer when not in list', () => {
    const reducer = moduleToTest(TEST_REDUCER, ['foo', 'bar']);
    const state = reducer(INITIAL_STATE, actionCreator(TEST_ACTION));
    expect(state).to.equal(fromJS({ some: 'thing' }));
  });

  it('calls the reducer when defined in list', () => {
    const reducer = moduleToTest(TEST_REDUCER, ['foo', TEST_ACTION, 'bar']);

    const state = reducer(INITIAL_STATE, actionCreator(TEST_ACTION));
    expect(state).to.equal(fromJS({
      ...INITIAL_STATE.toJS(),
      [TEST_ATTRIBUTE]: TEST_VALUE,
    }));
  });
});
