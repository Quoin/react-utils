import moduleToTest from './simple-clean';

describe(`src/routes-info/simple-clean`, () => {
  it(`is a function with 1 param`, () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  it(`returns '/' when no path defined`, () => {
    const value = moduleToTest('');
    expect(value).to.equal('/');
  });

  it(`reduces double-slashes to single slashes`, () => {
    const value = moduleToTest('some//path/with//double/slash');
    expect(value).to.equal('some/path/with/double/slash');
  });
});
