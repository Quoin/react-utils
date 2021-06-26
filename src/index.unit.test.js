import classnames from 'classnames';
import hal from 'hal';
import PropTypes from 'prop-types';
import React from 'react';
import * as ReactModule from 'react';
import ReactDOM from 'react-dom';
import * as ReactDomServer from 'react-dom/server';
import * as ReactHelmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Skeleton from 'react-loading-skeleton';
import ReactRouterDom from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as moduleToTest from './index';

import filespace from './_.test';
import exposesProperties from './exposes-properties.test';
import propertiesAreFrom from './properties-are-from.test';

describe(filespace(__filename), () => {
  const clone = { ...moduleToTest };

  after(() => {
    expect(clone).to.be.empty();
  });

  describe('re-export from 3rd parties', () => {
    propertiesAreFrom(clone, 'classnames', classnames, 'classnames');
    propertiesAreFrom(clone, 'hal', hal, [
      ['HalResource', 'Resource'],
      ['HalLink', 'Link'],
    ]);
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

    propertiesAreFrom(clone, 'react-helmet', ReactHelmet, [
      'Helmet',
    ]);

    propertiesAreFrom(clone, 'react-immutable-proptypes', ImmutablePropTypes, 'ImmutablePropTypes');

    propertiesAreFrom(clone, 'react-loading-skeleton', Skeleton, 'Skeleton');

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
    'buildNamespace',
    'concatenateReducers',
    'createStore',
    'DEFAULT_STATE',
    'errorBoundary',
    'filespace',
    'flattenFilespace',
    'flattenHal',
    'generateClassname',
    'generateClassnameFromPrefix',
    'generateClassnamesWithPrefix',
    'generateModuleAttributes',
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
