import getSubstate from './get-substate';
import { INamespace, IState } from './types';

export default (state: IState, namespace: INamespace, attribute: string, defaultValue?: any) => getSubstate(state, namespace).get(attribute, defaultValue);
