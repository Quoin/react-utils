import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import Ssr from './component';

export default (Component, store, page, url) => {
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
