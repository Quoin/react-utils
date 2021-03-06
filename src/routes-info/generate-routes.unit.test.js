import moduleToTest from './generate-routes';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 2 mandatory params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  it('throws when definition missing \'name\'', () => {
    const definitions = [{
      name: '',
      path: '',
    }];

    expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route definition missing 'name'.$/);
  });

  it('throws when definition missing \'path\'', () => {
    const definitions = [{
      name: 'a-name',
      path: '',
    }];

    expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route definition missing 'path'.$/);
  });

  it('detect route name duplicates', () => {
    const definitions = [{
      name: 'a-name',
      path: '/some/:thing',
    }, {
      name: 'a-name',
      path: '/some/:else',
    }];

    expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route name 'a-name' already in use.$/);
  });

  it('generates routes for one definition', () => {
    const definitions = [{
      name: 'a-name',
      path: '/some/:thing',
    }];

    const routes = moduleToTest(definitions, []);
    expect(routes).to.be.an('array').and.to.have.lengthOf(1);

    const route = routes[0];

    expect(route).to.have.property('name', 'a-name');
    expect(route).to.have.property('route', '/some/:thing');
    expect(route).to.have.property('path', '/some/{thing}');
  });
});
