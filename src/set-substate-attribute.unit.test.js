import { fromJS } from 'immutable';

import moduleToTest from './set-substate-attribute';

import filespace from './_.test';
import namespace from './namespace.test';

const ATTRIBUTE = 'some-attribute';

describe(filespace(__filename), () => {
  it('is a function with 4 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(4);
  });

  it('add to an empty state', () => {
    const state = fromJS({});
    const newState = moduleToTest(state, namespace, ATTRIBUTE, 'foobar');
    expect(newState).to.equal(fromJS({
      [namespace()]: {
        [ATTRIBUTE]: 'foobar',
      },
    }));
  });
});
