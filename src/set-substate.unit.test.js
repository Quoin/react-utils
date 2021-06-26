import { fromJS, Map } from 'immutable';

import moduleToTest from './set-substate';

import filespace from './_.test';
import namespace from './namespace.test';

const EMPTY_STATE = Map();

describe(filespace(__filename), () => {
  it('is a function with 3 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(3);
  });

  it('sets when empty state', () => {
    const value = moduleToTest(EMPTY_STATE, namespace, fromJS({ key: 'foobar' }));
    expect(value).to.equal(fromJS({
      [namespace()]: {
        key: 'foobar',
      },
    }));
  });

  it('overwrites value when defined', () => {
    const state = fromJS({
      [namespace()]: 'old value',
    });
    const value = moduleToTest(state, namespace, fromJS({ key: 'new value' }));
    expect(value).to.equal(fromJS({
      [namespace()]: {
        key: 'new value',
      },
    }));
  });

  it('adds the namespace if didn\'t exist', () => {
    const state = fromJS({
      [`not-${namespace()}`]: 'other value',
    });
    const value = moduleToTest(state, namespace, fromJS({ key: 'new value' }));
    expect(value).to.equal(fromJS({
      [`not-${namespace()}`]: 'other value',
      [namespace()]: {
        key: 'new value',
      },
    }));
  });
});
