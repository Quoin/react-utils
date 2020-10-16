import moduleToTest from './flatten-filespace';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  describe('()', () => {
    it('returns the string if not a folder', () => {
      const input = 'hello world';
      const output = 'hello world';
      expect(moduleToTest(input)).to.equal(output);
    });

    it('returns basename if it a folder', () => {
      const input = 'hello/world';
      const output = 'world';
      expect(moduleToTest(input)).to.equal(output);
    });

    it('returns basename if array 1 element', () => {
      const input = ['hello/world'];
      const output = 'world';
      expect(moduleToTest(input)).to.equal(output);
    });

    it('returns basename if array 2 elements', () => {
      const input = ['hello/world', 'foo'];
      const output = 'world/foo';
      expect(moduleToTest(input)).to.equal(output);
    });

    it('returns basenames of both strings', () => {
      const input = ['hello/world', 'foo/bar'];
      const output = 'world/bar';
      expect(moduleToTest(input)).to.equal(output);
    });

    it('returns handle recursion', () => {
      const input = ['hello/world', ['foo/bar', 'some/thing']];
      const output = 'world/bar/thing';
      expect(moduleToTest(input)).to.equal(output);
    });
  });
});
