import { fromJS } from 'immutable';

import actionCreator from './action-creator';
import { DEFAULT_STATE } from './constants';
import { IAction, IReducer, IReducerDefinition, IState } from './types';

import moduleToTest from './concatenate-reducers';

const FOO_TYPE = 'test-foo-type';

const BASIC_TYPE = 'test-basic-reducer-type';
const BASIC_ATTRIBUTE = 'test-basic-reducer-attribute';
const BASIC_VALUE = fromJS({ value: 'test-basic-reducer-value' });

const basicReducer = (state: IState = DEFAULT_STATE, action: IAction): IState => {
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

const guardedDefinition: IReducerDefinition = {
    actions: [ GUARDED_TYPE ],
    reducer: (state: IState = DEFAULT_STATE, _action: IAction): IState => state.set(GUARDED_ATTRIBUTE, GUARDED_VALUE)
};

describe(`src/concatenate-reducers`, () => {
    it(`is a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`returns a function with 2 params`, () => {
        const reducer = moduleToTest([]);
        expect(reducer).to.be.a('function').and.to.have.lengthOf(2);
    });

    describe(`single basic reducer`, () => {
        let reducer: IReducer;

        beforeEach(() => {
            reducer = moduleToTest([ basicReducer ]);
        });

        it(`handles wrong type`, () => {
            const state = reducer(fromJS({}), actionCreator(FOO_TYPE));
            expect(state).to.equal(fromJS({}));
        });

        it(`handles correct type`, () => {
            const state = reducer(fromJS({}), actionCreator(BASIC_TYPE));
            expect(state).to.equal(fromJS({
                [BASIC_ATTRIBUTE]: BASIC_VALUE
            }));
        });
    });

    describe(`guarded definition`, () => {
        let reducer: IReducer;

        beforeEach(() => {
            reducer = moduleToTest([ guardedDefinition ]);
        });

        it(`handles wrong type`, () => {
            const state = reducer(fromJS({}), actionCreator(FOO_TYPE));
            expect(state).to.equal(fromJS({}));
        });

        it(`handles correct type`, () => {
            const state = reducer(fromJS({}), actionCreator(GUARDED_TYPE));
            expect(state).to.equal(fromJS({
                [GUARDED_ATTRIBUTE]: GUARDED_VALUE
            }));
        });
    });
});