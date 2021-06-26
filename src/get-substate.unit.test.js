import { fromJS, Map } from 'immutable';

import filespace from './_.test';
import moduleToTest from './get-substate';
import namespace from './namespace.test';

const EMPTY_STATE = Map();
const STATE = fromJS({
  [namespace()]: {
    foo: 'bar',
  },
});

describe(filespace(__filename), () => {
  it('is a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.have.lengthOf(2);
  });

  it('returns default Map when state not initialized', () => {
    const substate = moduleToTest(EMPTY_STATE, namespace);
    expect(substate).to.equal(Map());
  });

  it('returns known substate', () => {
    const substate = moduleToTest(STATE, namespace);
    expect(substate).to.equal(fromJS({
      foo: 'bar',
    }));
  });
});
