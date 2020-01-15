import { IAction, IReducer, IState } from './types';

export default (reducer: IReducer, actionTypes: string[]) => (state: IState, action: IAction) => {
    if (actionTypes.indexOf(action.type) === -1) {
        return state;
    } else {
        return reducer(state, action);
    }
};