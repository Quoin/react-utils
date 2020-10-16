import moduleToTest from './generate-classname';

describe('src/generate-classname', () => {
  it('exports a function with no params (rest operator)', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(0);
  });

  describe('()', () => {
    it('returns empty string when no params.', () => {
      expect(moduleToTest()).to.equal('');
    });

    it('returns simple class names', () => {
      expect(moduleToTest('simple')).to.equal('simple');
      expect(moduleToTest('simple', 'class')).to.equal('simple--class');
      expect(moduleToTest('simple', 'class', 'names')).to.equal('simple--class--names');
    });

    it('returns cleaned complex class name', () => {
      expect(moduleToTest('not-so-simple')).to.equal('not-so-simple');
      expect(moduleToTest('not.so.simple')).to.equal('not-so-simple');
      expect(moduleToTest('not-so.simple')).to.equal('not-so-simple');
      expect(moduleToTest('not--so..simple')).to.equal('not-so-simple');
      expect(moduleToTest('not.-so-.simple')).to.equal('not-so-simple');
      expect(moduleToTest('something with some spaces')).to.equal('something-with-some-spaces');
      expect(moduleToTest('something  with  some double  spaces')).to.equal('something-with-some-double-spaces');
    });

    it('returns cleaned complex class name', () => {
      expect(moduleToTest('not-so-simple', 'class--name')).to.equal('not-so-simple--class-name');
      expect(moduleToTest('not-so-simple', 'class', 'name')).to.equal('not-so-simple--class--name');
      expect(moduleToTest('?question?')).to.equal('question');
      expect(moduleToTest('  not trimmed  ')).to.equal('not-trimmed');
      expect(moduleToTest(' ? double  spaces and -- !')).to.equal('double-spaces-and');
    });
  });
});
