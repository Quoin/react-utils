import moduleToTest from './url-template-path';

describe(`src/routes-info/url-template-path`, () => {
    it(`exports a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`returns empty string when empty string is passed`, () => {
        const value = moduleToTest('');
        expect(value).to.equal('');
    });

    it(`converts variable to url pattern`, () => {
        const value = moduleToTest('/path/:variable/remain');
        expect(value).to.equal('/path/{variable}/remain');
    });

    it(`converts single letter variable`, () => {
        const value = moduleToTest('/path/:v');
        expect(value).to.equal('/path/{v}');
    });

    it(`doesn't convert single digit variable`, () => {
        const value = moduleToTest('/path/:0');
        expect(value).to.equal('/path/:0');
    });

    it(`doesn't convert variable starting with a digit`, () => {
        const value = moduleToTest('/path/:0variable');
        expect(value).to.equal('/path/:0variable');
    });
});
