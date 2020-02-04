import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import Ssr from './ssr';

export default (Component, store, page, url) => {
    const context = {};

    const jsx = (
        <Provider store={store}>
            <StaticRouter location={url} context={context}>
                <Ssr page={page} state={store.getState().toJS()} Component={Component} />
            </StaticRouter>
        </Provider>
    );

    return '<!DOCTYPE html>\n' + renderToString(jsx);
};
