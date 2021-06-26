import moduleToTest from './generate-module-attributes';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('()', () => {
    it('returns empty object when no params', () => {
      const value = moduleToTest();
      expect(value).to.deep.equal({});
    });

    it('returns empty object when no attributes', () => {
      const value = moduleToTest('foo');
      expect(value).to.deep.equal({});
    });

    it('returns a key value when a single attribute', () => {
      const value = moduleToTest('foo', ['bar']);
      expect(value).to.deep.equal({ BAR: 'foo--bar' });
    });

    it('removes duplicate keys', () => {
      const value = moduleToTest('foo', ['bar', 'other', 'bar']);
      expect(value).to.deep.equal({ BAR: 'foo--bar', OTHER: 'foo--other' });
    });
  });
});
