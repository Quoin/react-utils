import { Map } from 'immutable';

import { INamespace, ISubstate } from './types';

export default (state: Map<string, any>, namespace: INamespace): ISubstate => state.get(namespace(), Map());
