import moduleToTest from './generate-routes';
import { IRouteDefinition } from './types';

describe(`src/routes-info/generate-routes`, () => {
    it(`exports a function with 2 mandatory params`, () => {
        expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
    });

    it(`throws when definition missing 'name'`, () => {
        const definitions: IRouteDefinition[] = [{
            name: '',
            path: ''
        }];

        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route definition missing 'name'.$/);
    });

    it(`throws when definition missing 'path'`, () => {
        const definitions: IRouteDefinition[] = [{
            name: 'a-name',
            path: ''
        }];

        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route definition missing 'path'.$/);
    });

    it(`detect route name duplicates`, () => {
        const definitions: IRouteDefinition[] = [{
            name: 'a-name',
            path: '/some/:thing'
        }, {
            name: 'a-name',
            path: '/some/:else'
        }];

        expect(() => moduleToTest(definitions, [])).to.throw(Error, /^Route name 'a-name' already in use.$/);
    });

    it(`generates routes for one definition`, () => {
        const definitions: IRouteDefinition[] = [{
            name: 'a-name',
            path: '/some/:thing'
        }];

        const routes = moduleToTest(definitions, []);
        expect(routes).to.be.an('array').and.to.have.lengthOf(1);
        console.log(`routes=`, routes);

        const route = routes[0];

        expect(route).to.have.property('name', 'a-name');
        expect(route).to.have.property('route', '/some/:thing');
        expect(route).to.have.property('path', '/some/{thing}');
    });
});
