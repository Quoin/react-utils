import moduleToTest from './simple-clean';

describe(`src/routes-info/simple-clean`, () => {
    it(`exports a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`throws when no params`, () => {
        expect(() => moduleToTest()).to.throw();
    });

    it(`returns '/' when empty string is passed`, () => {
        const value = moduleToTest('');
        expect(value).to.equal('/');
    });

    it(`removes double slashes`, () => {
        const value = moduleToTest('/hello//world');
        expect(value).to.equal('/hello/world');
    });

    it(`removes trailing slash`, () => {
        const value = moduleToTest('/hello/world/');
        expect(value).to.equal('/hello/world');
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
