import exposesProperties from '../exposes-properties.test';

import * as moduleToTest from './shapes';

describe("src/ssr/shapes", () => {
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
