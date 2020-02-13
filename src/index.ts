export { default as classnames } from 'classnames';
export const PropTypes = require('prop-types');
export { Fragment, useEffect } from 'react';
export const React = require('react');
export { hydrate, render } from 'react-dom';
export { renderToString } from 'react-dom/server';
export const ImmutablePropTypes = require('react-immutable-proptypes');

export {
    batch,
    Provider,
    useDispatch,
    useSelector
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
    withRouter
} from 'react-router-dom';

export { default as actionCreator } from './action-creator';
export { default as boundComponent } from './bound-component';
export { default as concatenateReducers } from './concatenate-reducers';
export { DEFAULT_STATE, INIT_TYPE } from './constants';
export { default as createStore } from './create-store';
export { default as errorBoundary } from './error-boundary';
export { default as getSubstate } from './get-substate';
export { default as getSubstateAttribute } from './get-substate-attribute';
export { default as hydrateWithStore } from './hydrate-with-store';
export { default as namespace } from './namespace';
export { default as namespacedActions } from './namespaced-actions';
export { default as setSubstate } from './set-substate';
export { default as RoutesInfo } from './routes-info';
export { default as setSubstateAttribute } from './set-substate-attribute';
export { default as ssrWithStore } from './ssr-with-store';
export { IAction, IActionType, IReducerDefinition, IState } from './types';
