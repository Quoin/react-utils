import * as moduleToTest from './constants';

describe(`src/constants`, () => {
    let clone: { [index: string]: any };

    before(() => {
        clone = { ...moduleToTest };
    });

    after(() => {
        expect(clone).to.be.empty();
    });

    [
        'DEFAULT_STATE',
        'ERROR_BOUNDARY_SUFFIX',
        'INIT_TYPE',
        'PLACEHOLDER',
        'PRELOADED_STATE',
        'PRELOADED_STATE_PLACEHOLDER_ID'
    ].forEach((property) => {
        it(`exposes property '${property}'`, () => {
            expect(clone, `Property ${property}`).to.have.property(property);
            delete clone[property];
        });
    });
});
