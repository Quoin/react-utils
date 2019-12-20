export default (reducer, actionTypes) => (state, action) => {
    if (actionTypes.indexOf(action.type) === -1) {
        return state;
    } else {
        return reducer(state, action);
    }
};
