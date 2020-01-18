import { IAction, IActionType } from './types';

export default (type: IActionType, payload?: object): IAction => Object.freeze({
    type,
    payload
});
