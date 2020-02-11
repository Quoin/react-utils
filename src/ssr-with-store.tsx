import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import Ssr from './ssr';
import { IStore } from './types';

export default (Component: React.ComponentType, store: IStore, page: object, url: string) => {
    const myContext = {};

    const jsx = (
        <Provider store={store}>
            <StaticRouter location={url} context={myContext}>
                <Ssr page={page} state={store.getState().toJS()} Component={Component} />
            </StaticRouter>
        </Provider>
    );

    return '<!DOCTYPE html>\n' + renderToString(jsx);
};
