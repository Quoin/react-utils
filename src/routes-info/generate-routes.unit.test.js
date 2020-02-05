import moduleToTest from './generate-routes';

describe(`src/routes-info/generate-routes`, () => {
    it(`exports a function with 2 mandatory params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
    });

    it(`throws when no params`, () => {
        expect(() => moduleToTest()).to.throw();
    });

    it(`returns empty array when no definitions`, () => {
        const value = moduleToTest([], []);
        expect(value).to.deep.equal([]);
    });

    it(`throws when definition missing 'name'`, () => {
        const definitions = [{}];
        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route definition missing 'name'.$/);
    });

    it(`throws when definition missing 'path'`, () => {
        const definitions = [{
            name: 'foo'
        }];
        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route definition missing 'path'.$/);
    });

    it(`throws when name duplicated`, () => {
        const definitions = [{
            name: 'foo',
            path: '/foo'
        }, {
            name: 'foo',
            path: '/bar'
        }];
        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route name 'foo' already in use.$/);
    });

    it(`throws when path duplicated`, () => {
        const definitions = [{
            name: 'foo',
            path: '/path'
        }, {
            name: 'bar',
            path: '/path'
        }];
        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route path '\/path' already in use.$/);
    });

    it(`handle one definition`, () => {
        const definitions = [{
            name: 'foo',
            path: '/path'
        }];
        const value = moduleToTest(definitions, []);
        expect(value).to.be.an('array').and.to.have.lengthOf(1);

        const firstValue = value[0];

        expect(firstValue).to.have.property('name', 'foo');
        expect(firstValue).to.have.property('route', '/path');
        expect(firstValue).to.have.property('path', '/path');
        expect(firstValue).to.have.property('template');
    });

    it(`handle one definition with parentPath`, () => {
        const definitions = [{
            name: 'foo',
            path: '/:path'
        }];
        const value = moduleToTest(definitions, [], '/some');
        expect(value).to.be.an('array').and.to.have.lengthOf(1);

        const firstValue = value[0];

        expect(firstValue).to.have.property('name', 'foo');
        expect(firstValue).to.have.property('route', '/some/:path');
        expect(firstValue).to.have.property('path', '/some/{path}');
        expect(firstValue).to.have.property('template');
    });
});
