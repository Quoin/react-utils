import { IAction, IActionType } from './types';

export default (type: IActionType, payload: object): IAction => {
    if (!type) {
        throw new Error(`Missing type`);
    }

    return Object.freeze({
        type,
        payload
    });
};
