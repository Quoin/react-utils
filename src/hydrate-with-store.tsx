import { fromJS } from 'immutable';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Middleware } from 'redux';

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from './constants';
import createStore from './create-store';
import { IReducer } from './types';

export default (
    Component: React.ComponentType,
    reducers: IReducer,
    middlewares: Middleware<any, any, any>[],
    inDevelopment: boolean,
    projectInitType?: string
) => {
    const placeholder = document.querySelector(`#${PLACEHOLDER}`);
    if (placeholder) {
        const initialState: object = window[PRELOADED_STATE];
        const store = createStore(reducers, fromJS(initialState), middlewares, inDevelopment, projectInitType);
        const jsx = (
            <Provider store={store}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        );

        hydrate(jsx, placeholder);
        delete window[PRELOADED_STATE];

        const scriptTag = document.querySelector(`#${PRELOADED_STATE_PLACEHOLDER_ID}`);
        if (scriptTag) {
            scriptTag.remove();
        }
    } else {
        console.error(`Cannot find placeholder '#${PLACEHOLDER}'.`);
    }
};
