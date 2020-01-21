import { Map } from 'immutable';

import { IState } from './types';

export const DEFAULT_STATE = (Map() as IState);
export const ERROR_BOUNDARY_SUFFIX = 'ErrorBoundary';
export const INIT_TYPE = 'QI:INIT';
export const PLACEHOLDER = 'react-app-placeholder';
export const PRELOADED_STATE = '__PRELOADED_REDUX_STATE__';
export const PRELOADED_STATE_PLACEHOLDER_ID = 'redux-preloaded-state-script-id';
