import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import Ssr from './ssr';

export default (Component, store, page) => '<!DOCTYPE html>\n' + renderToString(
    <Provider store={store}>
        <Ssr page={page} state={store.getState().toJS()} Component={Component} />
    </Provider>
);
