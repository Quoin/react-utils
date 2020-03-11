# How to make SSR app

An SSR application is composed of two parts. The [server-side](#server-side)
rendering, and the [client-side](#client-side) rendering.

## Server-side <a name="server-side"></a>

We have decided to have SPA with React routes.
See [ROUTES_INFO](routes-info.md).

```typescript
import express from 'express';

import { RoutesInfo } from '@quoin/react-utils';

import ssr from './ssr';
import ssr404 from './ssr-404';

export default () => {
  const app: expressApplication = express();

  // Adding your express.static() paths

  RoutesInfo.configure(ROUTES_INFO);
  RoutesInfo.register(app, ssr);

  // Adding any endpoints.

  // Adding favicon?

  app.get('*', ssr404);

  return app;

};
```

See [ROUTES_INFO](routes-info.md).


### ssr and ssr404

The `src/server/ssr/index.ts` would be something like:

```typescript
import content from './content';

export default (req: express.Request, res: express.Response): void => {
  try {
    const html: string = content(PUBLIC_PATH, req.url);
    res.status(200).type('text/html').send(html);
  } catch (err) {
    res.status(500).type('text/plain').send(err.toString());
  }
};
```

and `src/server/ssr404/index.ts` would be something like:

```typescript
import content from './../ssr/content';

export default (req: express.Request, res: express.Response): void => {
  try {
    const html: string = content(PUBLIC_PATH, req.url);
    res.status(404).type('text/html').send(html);
  } catch (err) {
    res.status(500).type('text/plain').send(err.toString());
  }
};
```

where could be defined as `PUBLIC_PATH: string = '/public'` in a constants file.
That's the path where the assets would be.

and `src/server/ssr/content.ts` would be something like:

```typescript
import {
  createStore,
  SsrAssetTypes
} from '@quoin/react-utils';

import { default as App, reducers } from './../../components';
import { default as middlewares } from './../../middlewares';

export default (assetPath: string = '', url: string = '/'): string => {
  const initialState = fromJS({});
  const store = createStore(reducers, initialState, middlewares, process.env.NODE_ENV === 'development');

  // store.dispatch() anything that is needed to initialize state.

  const page = {
    title: "This is your page title",
    meta: [{
      attribute: 'name',
      value: 'description',
      content: "Description of the page"
    }],
    assets: [{
      type: SsrAssetTypes.LINK,
      rel: 'stylesheet',
      href: `${assetPath}/css/app.min.css`
    }, {
      type: SsrAssetTypes.SCRIPT,
      src: `${assetPath}/js/bootstrap.min.js`
    }, {
      type: SsrAssetTypes.SCRIPT,
      src: `${assetPath}/js/vendor.min.js`
    }, {
      type: SsrAssetTypes.SCRIPT,
      src: `${assetPath}/js/app.min.js`
    }]
  };

  return ssrWithStore(App, store, page, url);
};
```


## Client-side <a name="client-side"></a>

The client-side rendering should have much less logic in there.

`src/client/index.ts`

```typescript
import {
  hydrateWithStore,
  RoutesInfo
} from '@quoin/react-utils';

import { default as App, reducers } from './../components';
import { default as middlewares } from './../middlewares';

RoutesInfo.configure(ROUTES_INFO);

const store = hydrateWithStore(App, reducers, middlewares, process.env.NODE_ENV === 'development');

// You can now fetch data from indexedDB and then dispatch it. Ideally, use one
// of your existing application orchestrators.
orchestrators.initializeFromCache(store.dispatch, cachedData);
```

See [ROUTES_INFO](routes-info.md).
