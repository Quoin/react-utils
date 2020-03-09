// import PropTypes from 'prop-types';
import React from 'react';

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from './../constants';
import errorBoundary from './../error-boundary';
import { IState } from './../types';

import generateLinkTags from './generate-link-tags';
import generateMetaTags from './generate-meta-tags';
import generateScriptTags from './generate-script-tags';
import { PageType } from './types';

interface Props {
  Component: any;
  page: PageType;
  state: IState;
};

const Component: React.FunctionComponent<Props> = (props) => {
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

// Component.propTypes = {
//     page: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         meta: PropTypes.arrayOf(PropTypes.exact({
//             attribute: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired,
//             content: PropTypes.string.isRequired
//         })).isRequired,
//         assets: PropTypes.arrayOf(PropTypes.object).isRequired
//     }).isRequired,
//     state: PropTypes.object.isRequired,
//     Component: PropTypes.elementType
// };

export default errorBoundary(Component);
