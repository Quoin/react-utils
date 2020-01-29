import { fromJS } from 'immutable';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import { PLACEHOLDER, PRELOADED_STATE } from './constants';
import createStore from './create-store';

export default (Component, reducers, middlewares, inDevelopment, projectInitType) => {
    const placeholder = document.querySelector(`#${PLACEHOLDER}`);
    if (placeholder) {
        const initialState = window[PRELOADED_STATE];
        const store = createStore(reducers, fromJS(initialState), middlewares, inDevelopment, projectInitType);
        hydrate(<Provider store={store}><Component /></Provider>, placeholder);
        delete window[PRELOADED_STATE];
    } else {
        console.error(`Cannot find placeholder '#${PLACEHOLDER}'.`);
    }
};
