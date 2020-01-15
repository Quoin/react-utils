import { INamespace, IState } from './types';

export default (state: IState, namespace: INamespace, attribute: string, value: any) => state.setIn([ namespace(), attribute ], value);
