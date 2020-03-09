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

export default errorBoundary(Component);
