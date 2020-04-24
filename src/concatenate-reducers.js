import reduxConcatenateReducers from 'redux-concatenate-reducers';

import guardAction from './guard-action';

export default (definitions) => reduxConcatenateReducers(
  definitions.map((definition) => ((typeof definition && definition.actions && definition.reducer)
    ? guardAction(definition.reducer, definition.actions)
    : definition)),
);
