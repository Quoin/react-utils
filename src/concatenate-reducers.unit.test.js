import { fromJS } from 'immutable';

import moduleToTest from './concatenate-reducers';

import filespace from './_.test';
import actionCreator from './action-creator';
import { DEFAULT_STATE } from './constants';

const FOO_TYPE = 'test-foo-type';

const BASIC_TYPE = 'test-basic-reducer-type';
const BASIC_ATTRIBUTE = 'test-basic-reducer-attribute';
const BASIC_VALUE = fromJS({ value: 'test-basic-reducer-value' });

const BASIC_REDUCER = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case BASIC_TYPE:
      return state.set(BASIC_ATTRIBUTE, BASIC_VALUE);

    default:
      return state;
  }
};

const GUARDED_TYPE = 'test-guarded-reducer-type';
const GUARDED_ATTRIBUTE = 'test-guarded-reducer-attribute';
const GUARDED_VALUE = fromJS({ value: 'test-guarded-reducer-value' });

const guardedDefinition = {
  actions: [GUARDED_TYPE],
  reducer: (state = DEFAULT_STATE) => state.set(GUARDED_ATTRIBUTE, GUARDED_VALUE),
};

describe(filespace(__filename), () => {
  it('is a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  it('throws when no params', () => {
    expect(() => moduleToTest()).to.throw(Error, /Cannot read property 'map' of undefined/);
  });

  it('returns a function with 2 params', () => {
    const reducer = moduleToTest([]);
    expect(reducer).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('single basic reducer', () => {
    let reducer;

    beforeEach(() => {
      reducer = moduleToTest([BASIC_REDUCER]);
    });

    it('handles wrong type', () => {
      const state = reducer(DEFAULT_STATE, actionCreator(FOO_TYPE));
      expect(state).to.equal(DEFAULT_STATE);
    });

    it('handles correct type', () => {
      const state = reducer(DEFAULT_STATE, actionCreator(BASIC_TYPE));
      expect(state).to.equal(fromJS({
        [BASIC_ATTRIBUTE]: BASIC_VALUE,
      }));
    });
  });

  describe('guarded definition', () => {
    let reducer;

    beforeEach(() => {
      reducer = moduleToTest([guardedDefinition]);
    });

    it('handles wrong type', () => {
      const state = reducer(DEFAULT_STATE, actionCreator(FOO_TYPE));
      expect(state).to.equal(DEFAULT_STATE);
    });

    it('handles correct type', () => {
      const state = reducer(DEFAULT_STATE, actionCreator(GUARDED_TYPE));
      expect(state).to.equal(fromJS({
        [GUARDED_ATTRIBUTE]: GUARDED_VALUE,
      }));
    });
  });

  describe('Wrong params', () => {
    it('fails when reducer not defined', () => {
      const reducer = moduleToTest([{ actions: [GUARDED_TYPE] }]);
      expect(() => reducer(DEFAULT_STATE, actionCreator(GUARDED_TYPE))).to.throw(TypeError);
    });

    it('fails when actions not defined', () => {
      const reducer = moduleToTest([{ reducer: BASIC_REDUCER }]);
      expect(() => reducer(DEFAULT_STATE, actionCreator(GUARDED_TYPE))).to.throw(TypeError);
    });
  });
});
