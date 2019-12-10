import moduleToTest from './action-creator';

describe("src/action-creator", () => {
    it("should be a function", () => {
        expect(moduleToTest).to.be.a('function');
    });

    it(`should throw "Missing type" when missing type`, () => {
        expect(() => moduleToTest()).to.throw(Error, /^Missing type$/);
    });

    it(`should return with type and undefined payload with no payload defined`, () => {
        const value = moduleToTest('FOO');
        expect(value).to.deep.equal({
            type: 'FOO',
            payload: undefined
        });
    });

    it(`should return type and payload when defined`, () => {
        const value = moduleToTest('FOO', { bar: 'foobar' });
        expect(value).to.deep.equal({
            type: 'FOO',
            payload: {
                bar: 'foobar'
            }
        });
    });
});
