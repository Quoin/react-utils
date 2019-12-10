import * as moduleToTest from './index';

describe("src/index", () => {
    let clone;

    before(() => {
        clone = { ...moduleToTest };
    });

    [
        'actionCreator',
        'namespace',
        'namespacedActions',
    ].forEach((property) => {
        it(`should have property '${property}'`, () => {
            expect(clone, `Property ${property}`).to.have.property(property);
            delete clone[property];
        });
    });

    after(() => {
        expect(clone).to.be.empty();
    });
});
