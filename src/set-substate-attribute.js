export default (state, namespace, attribute, value) => state.setIn([namespace(), attribute], value);
