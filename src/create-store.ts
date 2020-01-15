import { Map } from 'immutable';
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';

import { INIT_TYPE } from './constants';
import { IActionType, IState, IReducer } from './types';

export default (
    reducers: IReducer,
    initialState: IState = Map(),
    middlewares: Middleware<any, any, any>[],
    inDevelopment: boolean,
    projectInitType: IActionType
) => {
    let composeEnhancers = compose;

    const clonedMiddlewares = [ ...middlewares ];

    if (inDevelopment) {
        clonedMiddlewares.push(createLogger({
            collapsed: true,
            stateTransformer: (state) => state.toJS()
        }));

        if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...clonedMiddlewares)));

    store.dispatch({ type: INIT_TYPE });
    if (projectInitType) {
        store.dispatch({ type: projectInitType });
    }

    return store;
};
