import RoutesInfo from './model';

import moduleToTest from './index';

describe(`src/routes-info/index`, () => {
    it(`exports an instance of RoutesInfo`, () => {
        expect(moduleToTest).to.be.instanceOf(RoutesInfo);
    });
});
