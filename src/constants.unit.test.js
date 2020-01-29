import * as moduleToTest from './constants';

describe(`src/constants`, () => {
    let clone;

    before(() => {
        clone = { ...moduleToTest };
    });

    after(() => {
        expect(clone).to.be.empty();
    });

    [
        'ERROR_BOUNDARY_SUFFIX',
        'INIT_TYPE',
        'PLACEHOLDER',
        'PRELOADED_STATE'
    ].forEach((property) => {
        it(`has non-empty string property '${property}'`, () => {
            expect(clone).to.have.property(property);
            expect(clone[property]).to.be.a('string');
            expect(clone[property]).not.to.be.empty();
            delete clone[property];
        });
    });
});
