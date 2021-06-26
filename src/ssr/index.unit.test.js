import * as moduleToTest from './index';

import filespace from './_.test';
import exposesProperties from '../exposes-properties.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

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
