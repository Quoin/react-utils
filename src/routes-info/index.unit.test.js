import moduleToTest from './index';

import filespace from './_.test';
import RoutesInfo from './model';

describe(filespace(__filename), () => {
  it('exports an instance of RoutesInfo', () => {
    expect(moduleToTest).to.be.instanceOf(RoutesInfo);
  });
});
