import { IAction, IReducer, IState } from './types';

export default (reducer?: IReducer, actionTypes?: string[]) => (state: IState, action: IAction) => {
    if (! actionTypes) {
      return state;
    } else if (actionTypes.indexOf(action.type) === -1) {
        return state;
    } else if (reducer) {
        return reducer(state, action);
    } else {
      return state;
    }
};
