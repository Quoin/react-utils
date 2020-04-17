import getSubstate from './get-substate';

export default (
        state,
        namespace,
        attribute,
        defaultValue
) => getSubstate(state, namespace).get(attribute, defaultValue);
