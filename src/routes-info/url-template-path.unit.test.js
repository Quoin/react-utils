import moduleToTest from './url-template-path';

describe(`src/routes-info/url-template-path`, () => {
    it(`exports a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`throws when no params`, () => {
        expect(() => moduleToTest()).to.throw();
    });

    it(`handles no named param on path`, () => {
        const value = moduleToTest('/some/path');
        expect(value).to.equal('/some/path');
    });

    it(`handles single named param on path`, () => {
        const value = moduleToTest('/some/path/:namedParam');
        expect(value).to.equal('/some/path/{namedParam}');
    });

    it(`handles single letter named param on path`, () => {
        const value = moduleToTest('/some/path/:n');
        expect(value).to.equal('/some/path/{n}');
    });

    it(`handles multiple named params on path`, () => {
        const value = moduleToTest('/some/path/:namedParam1/:namedParam2');
        expect(value).to.equal('/some/path/{namedParam1}/{namedParam2}');
    });

    it(`doesn't convert named param starting with a digit`, () => {
        const value = moduleToTest('/some/path/:0namedParam');
        expect(value).to.equal('/some/path/:0namedParam');
    });

    describe(`non-string`, () => {
        [
            [ 0, "number 0" ],
            [ 1, "non-zero number" ],
            [ null, "null" ],
            [ undefined, "undefined" ],
            [ [], "array" ],
            [ {}, "object" ]
        ].forEach(([ value, desc ]) => {
            it(`throws when value is ${desc}`, () => {
                expect(() => moduleToTest(value)).to.throw();
            });
        });
    });
});
