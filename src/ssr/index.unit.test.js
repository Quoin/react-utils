import * as moduleToTest from './index';

describe(`src/ssr/index`, () => {
    let clone;

    before(() => {
        clone = { ...moduleToTest };
    });

    after(() => {
        expect(clone).to.be.empty();
    });

    describe(`AssetTypes`, () => {
        it(`is enum`, () => {
            expect(clone).to.have.property('AssetTypes');
        });

        [
            'LINK',
            'SCRIPT'
        ].forEach((property) => {
            it(`exports '${property}' as string`, () => {
                expect(clone.AssetTypes).to.have.property(property);
                expect(clone.AssetTypes[property]).is.a('string');
            });
        });

        after(() => {
            delete clone.AssetTypes;
        });
    });

    describe(`withStore()`, () => {
        it(`exports a function`, () => {
            expect(clone).to.have.property('withStore');
            expect(clone.withStore).to.be.a('function');
            delete clone.withStore;
        });
    });
});
