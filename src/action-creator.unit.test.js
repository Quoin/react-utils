import moduleToTest from './action-creator';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('should be a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  it('should return with type and undefined payload with no payload defined', () => {
    const value = moduleToTest('FOO');
    expect(value).to.deep.equal({
      type: 'FOO',
      payload: undefined,
    });
  });

  it('should return type and payload when defined', () => {
    const value = moduleToTest('FOO', { bar: 'foobar' });
    expect(value).to.deep.equal({
      type: 'FOO',
      payload: {
        bar: 'foobar',
      },
    });
  });
});
