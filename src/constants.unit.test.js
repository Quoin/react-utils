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
        'INIT_TYPE'
    ].forEach((property) => {
        it(`should have property '${property}'`, () => {
            expect(clone).to.have.property(property);
            delete clone[property];
        });
    });
});
