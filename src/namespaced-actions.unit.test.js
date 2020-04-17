import moduleToTest from './namespaced-actions';

import namespace from './namespace';

const NAMESPACE = namespace('@quoin/react-utils');
const myNamespace = (key) => `${NAMESPACE}.${key}`;

describe("src/namespaced-actions", () => {
    it("should be a function with 2 params", () => {
        expect(moduleToTest).to.be.a('function').and.have.lengthOf(2);
    });

    it(`throws when no baseKeys defined`, () => {
        expect(() => moduleToTest(myNamespace, [])).to.throw(Error, /^Missing baseKeys$/);
    });

    it(`returns known object`, () => {
        const value = moduleToTest(myNamespace, [ 'FOO', 'BAR' ]);
        expect(value).to.deep.equal({
            FOO: 'QUOIN-REACT-UTILS.FOO',
            BAR: 'QUOIN-REACT-UTILS.BAR'
        });
    });
});
