import moduleToTest from './build-namespace';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('export a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('()', () => {
    it('returns name when no path defined', () => {
      expect(moduleToTest('foo')).to.equal('foo');
    });

    it('returns name.path when both defined', () => {
      expect(moduleToTest('foo', 'bar')).to.equal('foo.bar');
    });
  });
});
