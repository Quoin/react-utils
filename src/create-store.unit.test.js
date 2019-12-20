import { fromJS } from 'immutable';

import moduleToTest from './create-store';

const DUMMY_INIT_TYPE = 'THIS-IS-A-TEST-TYPE-FOR-TEST';
const DUMMY_INIT_ATTRIBUTE = 'THIS-IS-A-TEST-ATTRIBUTE';
const DUMMY_INIT_VALUE = 'THIS-IS-A-TEST-VALUE';

const DUMMY_REDUCER = (state, action) => {
    if (action && action.type) {
        switch (action.type) {
            case DUMMY_INIT_TYPE:
                return state.set(DUMMY_INIT_ATTRIBUTE, DUMMY_INIT_VALUE);

            default:
                return state;
        }
    } else {
        return state;
    }
};

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
        const store = moduleToTest(DUMMY_REDUCER, fromJS({}), [], false);
        isAStore(store);

        // TODO: Verify that the reducer is used?
    });

    it(`returns a store in development mode`, () => {
        const store = moduleToTest(DUMMY_REDUCER, fromJS({}), [], true);
        isAStore(store);

        // TODO: Verify that the reducer is used?
        // TODO: Verify if logger is added?
    });

    it(`calls the project init type`, () => {
        const store = moduleToTest(DUMMY_REDUCER, fromJS({}), [], false, DUMMY_INIT_TYPE);
        isAStore(store);
        expect(store.getState()).to.deep.equal(fromJS({
            [DUMMY_INIT_ATTRIBUTE]: DUMMY_INIT_VALUE
        }));
    });
});
