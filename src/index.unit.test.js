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
        'classnames',
        'concatenateReducers',
        'createStore',
        'errorBoundary',
        'getSubstate',
        'getSubstateAttribute',
        'Fragment',
        'hydrate',
        'hydrateWithStore',
        'ImmutablePropTypes',
        'INIT_TYPE',
        'namespace',
        'namespacedActions',
        'React',
        'PropTypes',
        'Provider',
        'render',
        'renderToString',
        'setSubstate',
        'setSubstateAttribute',
        'ssrWithStore',
        'useDispatch',
        'useEffect',
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
