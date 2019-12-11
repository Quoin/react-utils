import moduleToTest from './create-store';

describe(`src/create-store`, () => {
    it(`is a function with 5 params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf.at.least(2);
    });
});
