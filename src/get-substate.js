import { Map } from 'immutable';

export default (state, namespace) => state.get(namespace(), Map());
