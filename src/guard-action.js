export default (reducer, actionTypes) => (state, action) => {
    if (!reducer || !actionTypes || (!actionTypes.includes(action.type))) {
        return state;
    } else {
        return reducer(state, action);
    }
};
