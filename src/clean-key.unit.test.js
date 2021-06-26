import moduleToTest from './clean-key';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  describe('()', () => {
    it('returns empty string when no params', () => {
      expect(moduleToTest()).to.equal('');
    });

    it('returns empty string when falsy', () => {
      expect(moduleToTest(false)).to.equal('');
      expect(moduleToTest(0)).to.equal('');
    });

    it('throws when not a string', () => {
      expect(() => moduleToTest([])).to.throw();
      expect(() => moduleToTest({})).to.throw();
    });

    it('removes invalid characters', () => {
      expect(moduleToTest(' a')).to.equal('A');
      expect(moduleToTest('-a')).to.equal('A');
      expect(moduleToTest('are you ok?')).to.equal('ARE_YOU_OK');
    });

    it('removes _* prefix', () => {
      expect(moduleToTest('_a')).to.equal('A');
      expect(moduleToTest('______a')).to.equal('A');
    });

    it('removes _* suffix', () => {
      expect(moduleToTest('a_')).to.equal('A');
      expect(moduleToTest('a______')).to.equal('A');
    });
  });
});
