import moduleToTest, { ERRORS } from './generate-classnames-with-prefix';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('()', () => {
    it('throws when no params', () => {
      expect(() => moduleToTest()).to.throw(ERRORS.MISSING_PREFIXES);
    });
  });

  describe('(prefixes)', () => {
    it('throws when prefixes not string[] or string', () => {
      expect(() => moduleToTest(0)).to.throw(ERRORS.InvalidPrefixes); // falsy
      expect(() => moduleToTest(false)).to.throw(ERRORS.InvalidPrefixes); // falsy
      expect(() => moduleToTest(null)).to.throw(ERRORS.InvalidPrefixes); // falsy
      expect(() => moduleToTest(1)).to.throw(ERRORS.InvalidPrefixes);
      expect(() => moduleToTest(true)).to.throw(ERRORS.InvalidPrefixes);
      expect(() => moduleToTest({})).to.throw(ERRORS.InvalidPrefixes);
    });

    it('throws when prefixes empty', () => {
      expect(() => moduleToTest('')).to.throw(ERRORS.EmptyPrefixes); // falsy
      expect(() => moduleToTest([])).to.throw(ERRORS.EmptyPrefixes); // falsy
    });

    it.skip('handles string[] with empty string');

    it('returns only MODULE when no keys defined', () => {
      expect(moduleToTest('foo')).to.deep.equal({
        MODULE: 'foo',
      });

      expect(moduleToTest(['one'])).to.deep.equal({
        MODULE: 'one',
      });

      expect(moduleToTest(['one', 'two'])).to.deep.equal({
        MODULE: 'one--two',
      });
    });
  });

  describe('(prefixes, keys)', () => {
    it('throws when keys not string[] or string', () => {
      expect(() => moduleToTest('prefixes', 0)).to.throw(ERRORS.InvalidKeys); // falsy
      expect(() => moduleToTest('prefixes', null)).to.throw(ERRORS.InvalidKeys); // falsy
      expect(() => moduleToTest('prefixes', false)).to.throw(ERRORS.InvalidKeys); // falsy
      expect(() => moduleToTest('prefixes', 1)).to.throw(ERRORS.InvalidKeys);
      expect(() => moduleToTest('prefixes', true)).to.throw(ERRORS.InvalidKeys);
      expect(() => moduleToTest('prefixes', {})).to.throw(ERRORS.InvalidKeys);
    });

    it('throws when empty keys', () => {
      expect(() => moduleToTest('prefixes', [])).to.throw(ERRORS.EmptyKeys);
      expect(() => moduleToTest('prefixes', '')).to.throw(ERRORS.EmptyKeys);
    });

    it('returns expected object', () => {
      expect(moduleToTest('prefixes', ['one', 'two', 'three'])).to.deep.equal({
        MODULE: 'prefixes',
        ONE: 'prefixes--one',
        TWO: 'prefixes--two',
        THREE: 'prefixes--three',
      });

      expect(moduleToTest('prefixes', ['some space', 'double--dash', 'question?', 'keep Case'])).to.deep.equal({
        MODULE: 'prefixes',
        SOME_SPACE: 'prefixes--some-space',
        DOUBLE_DASH: 'prefixes--double-dash',
        QUESTION: 'prefixes--question',
        KEEP_CASE: 'prefixes--keep-case',
      });

      expect(moduleToTest(['two', 'prefixes'], ['BIG_NAME', 'CLASS_?NAME?'])).to.deep.equal({
        MODULE: 'two--prefixes',
        BIG_NAME: 'two--prefixes--big-name',
        CLASS_NAME: 'two--prefixes--class-name',
      });
    });
  });
});
