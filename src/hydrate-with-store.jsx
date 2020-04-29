/* globals document window */

import { fromJS } from 'immutable';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from './constants';
import createStore from './create-store';

export default (
  Component,
  reducers,
  middlewares,
  inDevelopment,
  projectInitType,
  preRender,
) => {
  const placeholder = document.querySelector(`#${PLACEHOLDER}`);
  if (placeholder) {
    const initialState = window[PRELOADED_STATE];
    const store = createStore(reducers, fromJS(initialState), middlewares, inDevelopment, projectInitType);

    if (preRender) {
      preRender(store.getState());
    }

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

    return store;
  }
  throw new Error(`Cannot find placeholder '#${PLACEHOLDER}'.`);
};
