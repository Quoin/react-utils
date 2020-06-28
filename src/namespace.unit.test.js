import moduleToTest from './namespace';

describe('src/namespace', () => {
  it('exports a function with one param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  it('handles package name properly', () => {
    const value = moduleToTest('@quoin/react-test');
    expect(value).to.equal('QUOIN-REACT-TEST');
  });

  it('handles no params', () => {
    expect(moduleToTest()).to.equal('');
  });
});
