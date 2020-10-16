import sinon from 'sinon';

import moduleToTest from './build-namespace';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('export a function with 3 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(3);
  });

  describe('()', () => {
    it('returns name when no path defined', () => {
      const namespace = sinon.fake.returns('static-value');

      const value = moduleToTest(namespace, 'foo');

      expect(namespace).to.have.been.calledWith('foo');
      expect(value).to.equal('static-value');
    });

    it('returns name.path when both defined', () => {
      const namespace = sinon.fake.returns('static-value');
      const value = moduleToTest(namespace, 'foo', 'bar');

      expect(namespace).to.have.been.calledWith('foo.bar');
      expect(value).to.equal('static-value');
    });
  });
});
