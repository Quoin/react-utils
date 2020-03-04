import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { IStore } from './../types';

import Ssr from './component';
import { PageType } from './types';

export default (Component: React.ComponentType, store: IStore, page: PageType, url: string): React.ReactNode => {
    const myContext = {};

    const jsx = (
        <Provider store={store}>
            <StaticRouter location={url} context={myContext}>
                <Ssr page={page} state={store.getState()} Component={Component} />
            </StaticRouter>
        </Provider>
    );

    return '<!DOCTYPE html>\n' + renderToString(jsx);
};
