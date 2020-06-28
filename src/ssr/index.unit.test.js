import exposesProperties from '../exposes-properties.test';

import * as moduleToTest from './index';

describe('src/ssr/index', () => {
  const clone = {...moduleToTest };

  after(() => {
    expect(clone).to.be.empty();
  });

  describe('AssetTypes', () => {
    const assetTypesClone = { ...clone.AssetTypes };

    after(() => {
      delete clone.AssetTypes;
    });

    it('is enum', () => {
      expect(clone).to.have.property('AssetTypes');
    });

    exposesProperties(assetTypesClone, [
      'LINK',
      'SCRIPT',
    ], 'string');
  });

  describe('withStore()', () => {
    it('exports a function', () => {
      expect(clone).to.have.property('withStore');
      expect(clone.withStore).to.be.a('function');
      delete clone.withStore;
    });
  });
});
