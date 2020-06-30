import moduleToTest from './generate-classname-from-prefix';

describe('src/generate-classname-from-prefix', () => {
  it('exports a function with rest operator', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(0);
  });

  it('returns a function with rest operator', () => {
    const fn = moduleToTest();
    expect(fn).to.be.a('function').and.to.have.lengthOf(0);
  });

  it('returns expected class name', () => {
    expect(moduleToTest('a')('b')).to.equal('a--b');
    expect(moduleToTest('a', 'b')('c')).to.equal('a--b--c');
    expect(moduleToTest('a', 'b')('c', 'd')).to.equal('a--b--c--d');
  });

  it('accepts no prefix', () => {
    expect(moduleToTest()('c', 'd')).to.equal('c--d');
  });

  it('accepts no suffix', () => {
    expect(moduleToTest('a', 'b')()).to.equal('a--b');
  });
});
