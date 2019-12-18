import { fromJS, Map } from 'immutable';

import moduleToTest from './get-substate-attribute';
import namespace from './namespace.test';

const ATTRIBUTE = 'some-attribute';
const EMPTY_STATE = Map();
const EMPTY_SUBSTATE = EMPTY_STATE.set(namespace(), Map());
const WITHOUT_ATTRIBUTE = EMPTY_STATE.set(namespace(), fromJS({ other: 'attribute' }));
const WITH_ATTRIBUTE = WITHOUT_ATTRIBUTE.setIn([namespace(), ATTRIBUTE], 'something');

describe(`src/get-substate-attribute`, () => {
    it(`exposes a function with 4 params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(4);
    });

    it(`returns nothing if empty state`, () => {
        const value = moduleToTest(EMPTY_STATE, namespace);
        expect(value).to.be.undefined();
    });

    it(`returns nothing if substate has no attributes`, () => {
        const value = moduleToTest(EMPTY_SUBSTATE, namespace, ATTRIBUTE);
        expect(value).to.be.undefined();
    });

    it(`returns nothing if attribute was not set`, () => {
        const value = moduleToTest(WITHOUT_ATTRIBUTE, namespace, ATTRIBUTE);
        expect(value).to.be.undefined();
    });

    it(`returns default value if attribute was not set`, () => {
        const value = moduleToTest(WITHOUT_ATTRIBUTE, namespace, ATTRIBUTE, 'foobar');
        expect(value).to.equal('foobar');
    });

    it(`returns known known value for existing substate.attribute`, () => {
        const value = moduleToTest(WITH_ATTRIBUTE, namespace, ATTRIBUTE, 'foobar');
        expect(value).to.equal('something');
    });
});
