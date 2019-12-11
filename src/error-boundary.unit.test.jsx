import moduleToTest from './error-boundary';

describe(`src/error-boundary`, () => {
    it(`should be a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });
});
