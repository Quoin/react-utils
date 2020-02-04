import { fromJS } from 'immutable';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from './constants';
import createStore from './create-store';

export default (Component, reducers, middlewares, inDevelopment, projectInitType) => {
    const placeholder = document.querySelector(`#${PLACEHOLDER}`);
    if (placeholder) {
        const initialState = window[PRELOADED_STATE];
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
