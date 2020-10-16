export { default as classnames } from 'classnames';
export { Resource as HalResource, Link as HalLink } from 'hal';
export { default as PropTypes } from 'prop-types';
export {
  default as React, Fragment, useEffect, useRef,
} from 'react';
export { hydrate, render } from 'react-dom';
export { renderToString } from 'react-dom/server';
export { Helmet } from 'react-helmet';
export { default as ImmutablePropTypes } from 'react-immutable-proptypes';
export { default as Skeleton } from 'react-loading-skeleton';

export {
  batch,
  Provider,
  useDispatch,
  useSelector,
} from 'react-redux';

export {
  BrowserRouter,
  HashRouter,
  Link,
  MemoryRouter,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Router,
  StaticRouter,
  Switch,
  generatePath,
  matchPath,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';

export { default as actionCreator } from './action-creator';
export { default as boundComponent } from './bound-component';
export { default as buildNamespace } from './build-namespace';
export { default as concatenateReducers } from './concatenate-reducers';
export { DEFAULT_STATE, INIT_TYPE } from './constants';
export { default as createStore } from './create-store';
export { default as errorBoundary } from './error-boundary';
export { default as flattenFilespace } from './flatten-filespace';
export { default as flattenHal } from './flatten-hal';
export { default as generateClassname } from './generate-classname';
export { default as generateClassnameFromPrefix } from './generate-classname-from-prefix';
export { default as generateClassnamesWithPrefix } from './generate-classnames-with-prefix';
export { default as getSubstate } from './get-substate';
export { default as getSubstateAttribute } from './get-substate-attribute';
export { default as hydrateWithStore } from './hydrate-with-store';
export { default as namespace } from './namespace';
export { default as namespacedActions } from './namespaced-actions';
export { default as setSubstate } from './set-substate';
export { default as RoutesInfo } from './routes-info';
export { default as setSubstateAttribute } from './set-substate-attribute';
export {
  AssetTypes as SsrAssetTypes,
  withStore as ssrWithStore,
} from './ssr';
