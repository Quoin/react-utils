import { fromJS } from 'immutable';

import {
    TEST_INIT_ATTRIBUTE,
    TEST_INIT_TYPE,
    TEST_INIT_VALUE,
    TEST_REDUCER
} from './test-utils.test';

import moduleToTest from './create-store';


const isAStore = (store) => {
    expect(store).to.have.property('dispatch');
    expect(store).to.have.property('getState');
    expect(store).to.have.property('replaceReducer');
    expect(store).to.have.property('subscribe');
};

describe(`src/create-store`, () => {
    it(`is a function with 5 params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(5);
    });

    it(`returns a store`, () => {
        const store = moduleToTest(TEST_REDUCER, fromJS({}), [], false);
        isAStore(store);

        // TODO: Verify that the reducer is used?
    });

    it(`returns a store in development mode`, () => {
        const store = moduleToTest(TEST_REDUCER, fromJS({}), [], true);
        isAStore(store);

        // TODO: Verify that the reducer is used?
        // TODO: Verify if logger is added?
    });

    it(`calls the project init type`, () => {
        const store = moduleToTest(TEST_REDUCER, fromJS({}), [], false, TEST_INIT_TYPE);
        isAStore(store);
        expect(store.getState()).to.equal(fromJS({
            [TEST_INIT_ATTRIBUTE]: TEST_INIT_VALUE
        }));
    });
});
