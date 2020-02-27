import { IAction, IReducer, IState } from './types';

export default (reducer?: IReducer, actionTypes?: string[]) => (state: IState, action: IAction) => {
    if (!reducer || !actionTypes || (!actionTypes.includes(action.type))) {
        return state;
    } else {
        return reducer(state, action);
    }
};
