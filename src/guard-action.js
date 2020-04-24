export default (reducer, actionTypes) => (state, action) => {
  if (!reducer || !actionTypes || (!actionTypes.includes(action.type))) {
    return state;
  }
  return reducer(state, action);
};
