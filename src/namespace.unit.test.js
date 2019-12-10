import moduleToTest from './namespace';

describe(`src/namespace`, () => {
    it(`should be a function with one param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`should handle package name properly`, () => {
        const value = moduleToTest('@quoin/react-test');
        expect(value).to.equal('QUOIN-REACT-TEST');
    });
});
