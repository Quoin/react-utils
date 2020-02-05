import * as moduleToTest from './index';

describe("src/index", () => {
    let clone;

    before(() => {
        clone = { ...moduleToTest };
    });

    [
        'actionCreator',
        'batch',
        'boundComponent',
        'BrowserRouter',
        'classnames',
        'concatenateReducers',
        'createStore',
        'errorBoundary',
        'getSubstate',
        'getSubstateAttribute',
        'Fragment',
        'HashRouter',
        'hydrate',
        'hydrateWithStore',
        'ImmutablePropTypes',
        'INIT_TYPE',
        'Link',
        'namespace',
        'namespacedActions',
        'NavLink',
        'React',
        'PropTypes',
        'Provider',
        'Redirect',
        'render',
        'renderToString',
        'Route',
        'RoutesInfo',
        'setSubstate',
        'setSubstateAttribute',
        'ssrWithStore',
        'StaticRouter',
        'Switch',
        'useDispatch',
        'useEffect',
        'useParams',
        'useRouteMatch',
        'useSelector'
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
