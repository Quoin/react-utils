import { Map } from 'immutable';

import { INamespace } from './namespace';

export default (state: Map<string, any>, namespace: INamespace) => state.get(namespace(), Map());
