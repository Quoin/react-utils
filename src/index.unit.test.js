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
        'namespace',
        'namespacedActions',
        'PropTypes',
        'render',
        'rendereToString',
        'setSubstate',
        'setSubstateAttribute',
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
