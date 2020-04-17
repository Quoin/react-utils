import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from './../constants';
import errorBoundary from './../error-boundary';

import generateLinkTags from './generate-link-tags';
import generateMetaTags from './generate-meta-tags';
import generateScriptTags from './generate-script-tags';

const Component = (props) => {
    const stateAsString = JSON.stringify(props.state.toJS()).replace(/</g, '\\u003c');

    return (
        <html>
            <head>
                <title>{props.page.title}</title>
                {generateMetaTags(props.page.meta)}
                {generateLinkTags(props.page.assets)}
            </head>
            <body>
                <div id={PLACEHOLDER}><props.Component /></div>
                <script id={PRELOADED_STATE_PLACEHOLDER_ID} dangerouslySetInnerHTML={{ __html: `window.${PRELOADED_STATE} = ${stateAsString};` }}></script>
                {generateScriptTags(props.page.assets)}
            </body>
        </html>
    );
};

Component.propTypes = {
    page: PropTypes.shape({
        assets: PropTypes.array,
        meta: PropTypes.array,
        title: PropTypes.string.isRequired
    }),
    state: ImmutablePropTypes.map.isRequired
};

export default errorBoundary(Component);
