import reduxConcatenateReducers from 'redux-concatenate-reducers';

import { IReducerDefinition } from './types';

import guardAction from './guard-action';

export default (definitions: IReducerDefinition[]) => reduxConcatenateReducers(
    definitions.map((definition) => (definition && definition.actions && definition.reducer)
        ? guardAction(definition.reducer, definition.actions)
        : definition
    )
);
