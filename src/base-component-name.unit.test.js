import moduleToTest from './base-component-name';

import { ERROR_BOUNDARY_SUFFIX } from './constants';

describe(`src/base-component-name`, () => {
    it(`should be a function with 1 param`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
    });

    it(`should remove error boundary suffix if at the end`, () => {
        const moduleName = `FOO${ERROR_BOUNDARY_SUFFIX}`;
        const value = moduleToTest(moduleName);
        expect(value).to.equal('FOO');
    });

    it(`should not remove if not suffix`, () => {
        const moduleName = `FOO${ERROR_BOUNDARY_SUFFIX}BAR`;
        const value = moduleToTest(moduleName);
        expect(value).to.equal(moduleName);
    });

    it(`should not remove if not present`, () => {
        const moduleName = `FOOBAR`;
        const value = moduleToTest(moduleName);
        expect(value).to.equal(moduleName);
    });

    it(`should return empty string if no params`, () => {
        const value = moduleToTest();
        expect(value).to.equal('');
    });
});
