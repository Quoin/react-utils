import * as moduleToTest from './shapes';

import filespace from './_.test';
import exposesProperties from '../exposes-properties.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

  after(() => {
    expect(clone).to.be.empty();
  });

  exposesProperties(clone, [
    'link',
    'meta',
    'script',
  ]);
});
