import reduxConcatenateReducers from 'redux-concatenate-reducers';

import { IReducer, IReducerDefinition } from './types';

import guardAction from './guard-action';

export default (definitions: Array<IReducer | IReducerDefinition>) => reduxConcatenateReducers(
    definitions.map((definition) => (typeof definition && (definition as IReducerDefinition).actions && (definition as IReducerDefinition).reducer)
        ? guardAction((definition as IReducerDefinition).reducer, (definition as IReducerDefinition).actions)
        : definition
    )
);
