import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from '../constants';
import errorBoundary from '../error-boundary';

import generateLinkTags from './generate-link-tags';
import generateMetaTags from './generate-meta-tags';
import generateScriptTags from './generate-script-tags';

const Component = ({
  Component: AppComponent,
  page,
  state,
}) => {
  const stateAsString = JSON.stringify(state.toJS()).replace(/</g, '\\u003c');

  return (
    <html lang="en">
      <head>
        <title>{page.title}</title>
        {generateMetaTags(page.meta)}
        {generateLinkTags(page.assets)}
      </head>
      <body>
        <div id={PLACEHOLDER}><AppComponent /></div>
        <script id={PRELOADED_STATE_PLACEHOLDER_ID} dangerouslySetInnerHTML={{ __html: `window.${PRELOADED_STATE} = ${stateAsString};` }} />
        {generateScriptTags(page.assets)}
      </body>
    </html>
  );
};

Component.propTypes = {
  Component: PropTypes.element.isRequired,
  page: PropTypes.shape({
    assets: PropTypes.array,
    meta: PropTypes.array,
    title: PropTypes.string.isRequired,
  }).isRequired,
  state: ImmutablePropTypes.map.isRequired,
};

export default errorBoundary(Component);
