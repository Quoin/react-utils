import moduleToTest from './namespaced-actions';

import namespace from './namespace';

const NAMESPACE = namespace('@quoin/react-utils');
const myNamespace = (key) => `${NAMESPACE}.${key}`;

describe("src/namespaced-actions", () => {
    it("should be a function with 2 params", () => {
        expect(moduleToTest).to.be.a('function').and.have.lengthOf(2);
    });

    it(`should throw "Missing namespace" when no namespace`, () => {
        expect(() => moduleToTest()).to.throw(Error, /^Missing namespace$/);
    });

    it(`should throw "namespace is not a function" when namespace is not a function`, () => {
        expect(() => moduleToTest("foo")).to.throw(Error, /^namespace is not a function$/);
    });

    it(`should throw "Missing baseKeys" when no baseKeys`, () => {
        expect(() => moduleToTest(() => {})).to.throw(Error, /^Missing baseKeys$/);
    });

    it (`should return known object`, () => {
        const value = moduleToTest(myNamespace, [ 'FOO', 'BAR' ]);
        expect(value).to.deep.equal({
            FOO: 'QUOIN-REACT-UTILS.FOO',
            BAR: 'QUOIN-REACT-UTILS.BAR',
        });
    });

});
