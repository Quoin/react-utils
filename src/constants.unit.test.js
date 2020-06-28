import exposesProperties from './exposes-properties.test';
import exposesStrings from './exposes-strings.test';

import * as moduleToTest from './constants';

describe('src/constants', () => {
  const clone = { ...moduleToTest };

  after(() => {
    expect(clone).to.be.empty();
  });

  exposesProperties(clone, [
    'DEFAULT_STATE',
  ]);

  exposesStrings(clone, [
    'ERROR_BOUNDARY_SUFFIX',
    'INIT_TYPE',
    'PLACEHOLDER',
    'PRELOADED_STATE',
    'PRELOADED_STATE_PLACEHOLDER_ID',
  ]);
});
