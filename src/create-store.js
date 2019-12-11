import { compose } from 'redux';
import { applyMiddleware, createLogger, createStore } from 'redux-logger';

import { INIT_TYPE } from './constants';

export default (reducers, initialState, middlewares = [], inDevelopment = false, projectInitType = null) => {
    let composeEnhancers = compose;

    const clonedMiddlewares = [ ...middlewares ];

    if (inDevelopment) {
        const loggerOptions = { collapsed: true };
        if (typeof initialState.toJS === 'function' && typeof initialState.isMap === 'function' && initialState.isMap()) {
            loggerOptions.stateTransformer = (state) => state.toJS();
        }

        clonedMiddlewares.push(createLogger(loggerOptions));

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
