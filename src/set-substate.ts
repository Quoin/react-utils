import { INamespace, IState, ISubstate } from './types';

export default (state: IState, namespace: INamespace, value: ISubstate) => state.set(namespace(), value);