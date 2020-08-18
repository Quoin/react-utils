import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import * as ReactModule from 'react';
import ReactDOM from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactRouterDom from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import exposesProperties from './exposes-properties.test';
import propertiesAreFrom from './properties-are-from.test';

import * as moduleToTest from './index';

describe('src/index', () => {
  const clone = { ...moduleToTest };

  after(() => {
    expect(clone).to.be.empty();
  });

  describe('re-export from 3rd parties', () => {
    propertiesAreFrom(clone, 'classnames', classnames, 'classnames');
    propertiesAreFrom(clone, 'prop-types', PropTypes, 'PropTypes');

    propertiesAreFrom(clone, 'react', ReactModule, [
      'Fragment',
      'useEffect',
      'useRef',
    ]);
    propertiesAreFrom(clone, 'react', React, 'React');

    propertiesAreFrom(clone, 'react-dom', ReactDOM, [
      'hydrate',
      'render',
    ]);

    propertiesAreFrom(clone, 'react-dom/server', ReactDomServer, [
      'renderToString',
    ]);

    propertiesAreFrom(clone, 'react-immutable-proptypes', ImmutablePropTypes, 'ImmutablePropTypes');

    propertiesAreFrom(clone, 'react-redux', ReactRedux, [
      'batch',
      'Provider',
      'useDispatch',
      'useSelector',
    ]);

    propertiesAreFrom(clone, 'react-router-dom', ReactRouterDom, [
      'BrowserRouter',
      'HashRouter',
      'Link',
      'MemoryRouter',
      'NavLink',
      'Prompt',
      'Redirect',
      'Route',
      'Router',
      'StaticRouter',
      'Switch',
      'generatePath',
      'matchPath',
      'useHistory',
      'useLocation',
      'useParams',
      'useRouteMatch',
      'withRouter',
    ]);
  });

  exposesProperties(clone, [
    'actionCreator',
    'boundComponent',
    'concatenateReducers',
    'createStore',
    'DEFAULT_STATE',
    'errorBoundary',
    'flattenHal',
    'generateClassname',
    'generateClassnameFromPrefix',
    'getSubstate',
    'getSubstateAttribute',
    'hydrateWithStore',
    'INIT_TYPE',
    'namespace',
    'namespacedActions',
    'RoutesInfo',
    'setSubstate',
    'setSubstateAttribute',
    'SsrAssetTypes',
    'ssrWithStore',
  ]);
});
