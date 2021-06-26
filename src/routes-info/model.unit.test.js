import ModuleToTest from './model';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exposes a class', () => {
    expect(ModuleToTest).to.be.a('function').and.to.have.lengthOf(0);
    const instance = new ModuleToTest();
    expect(instance).to.be.an.instanceOf(ModuleToTest);
  });

  describe('()', () => {
    let instance;

    beforeEach(() => {
      instance = new ModuleToTest();
    });

    describe('configure()', () => {
      it('exposes configure() with 1 param', () => {
        expect(instance.configure).to.be.a('function').and.to.have.lengthOf(1);
      });
    });

    describe('register()', () => {
      it('exposes register() with 2 params', () => {
        expect(instance.register).to.be.a('function').and.to.have.lengthOf(2);
      });
    });

    describe('to()', () => {
      it('exposes to() with 2 params', () => {
        expect(instance.to).to.be.a('function').and.to.have.lengthOf(2);
      });
    });

    describe('path()', () => {
      it('exposes path() with 1 param', () => {
        expect(instance.path).to.be.a('function').and.to.have.lengthOf(1);
      });

      it('returns empty path when not found', () => {
        expect(instance.path('foo')).to.equal('');
      });
    });
  });
});
