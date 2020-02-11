import classnames from 'classnames';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import * as ReactModule from 'react';
import ReactDOM from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactRouterDom from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as moduleToTest from './index';

describe("src/index", () => {
    let clone: { [index: string]: any };

    before(() => {
        clone = { ...moduleToTest };
    });

    const propertyIsFrom = (moduleName: string, importedModule: {[index: string]: any}, properties: string | string[]) => {
        describe(moduleName, () => {
            if (Array.isArray(properties)) {
                properties.forEach((property) => {
                    it(`export { ${property} } from '${moduleName}'`, () => {
                        expect(clone).to.have.property(property);
                        expect(clone[property]).to.equal(importedModule[property]);
                        delete clone[property];
                    });
                });
            } else {
                it(`exports { default as ${properties} } from '${moduleName}'`, () => {
                    expect(clone).to.have.property(properties);
                    expect(clone[properties]).to.equal(importedModule);
                    delete clone[properties];
                });
            }
        });
    };

    describe(`re-export from 3rd parties`, () => {
        propertyIsFrom('classnames', classnames, 'classnames');
        propertyIsFrom('prop-types', PropTypes, 'PropTypes');

        propertyIsFrom('react', ReactModule, [
            'Fragment',
            'useEffect'
        ]);
        propertyIsFrom('react', React, 'React');

        propertyIsFrom('react-dom', ReactDOM, [
            'hydrate',
            'render'
        ]);

        propertyIsFrom('react-dom/server', ReactDomServer, [
            'renderToString'
        ]);

        propertyIsFrom('react-immutable-proptypes', ImmutablePropTypes, 'ImmutablePropTypes');

        propertyIsFrom('react-redux', ReactRedux, [
            'batch',
            'Provider',
            'useDispatch',
            'useSelector'
        ]);

        propertyIsFrom('react-router-dom', ReactRouterDom, [
            'BrowserRouter',
            'HashRouter',
            'Link',
            'MemoryRouter',
            'NavLink',
            'Prompt',
            'Redirect',
            'Route',
            'Router',
            'StaticRouter',
            'Switch',
            'generatePath',
            'matchPath',
            'useHistory',
            'useLocation',
            'useParams',
            'useRouteMatch',
            'withRouter'
        ]);
    });

    [
        'actionCreator',
        'boundComponent',
        'concatenateReducers',
        'createStore',
        'DEFAULT_STATE',
        'errorBoundary',
        'getSubstate',
        'getSubstateAttribute',
        'hydrateWithStore',
        'INIT_TYPE',
        'namespace',
        'namespacedActions',
        'React',
        'RoutesInfo',
        'PropTypes',
        'Provider',
        'render',
        'renderToString',
        'setSubstate',
        'setSubstateAttribute',
        'ssrWithStore',
    ].forEach((property) => {
        it(`should have property '${property}'`, () => {
            expect(clone, `Property ${property}`).to.have.property(property);
            delete clone[property];
        });
    });

    after(() => {
        expect(clone).to.be.empty();
    });
});
