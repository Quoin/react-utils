import PropTypes from 'prop-types';
import React from 'react';

import { PRELOADED_STATE } from './constants';
import errorBoundary from './error-boundary';

const generateCss = (assets = []) => assets
    .filter((path) => path.endsWith('.css'))
    .map((path, index) => <link key={index} rel="stylesheet" href={path} />)
;

const generateJs = (assets = []) => assets
    .filter((path) => path.endsWith('.js'))
    .map((path, index) => <script key={index} type="text/javascript" src={path}></script>)
;

const Component = (props) => {
    const stateAsString = JSON.stringify(props.state).replace(/</g, '\\u003c');

    return (
        <html>
            <head>
                <title>{props.page.title}</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                {generateCss(props.page.assets)}
            </head>
            <body>
                <div id="react-placeholder">
                    <props.Component {...props.componentProps} />
                </div>
                <script dangerouslySetInnerHTML={{ __html: `window.${PRELOADED_STATE} = ${stateAsString};` }}></script>
                {generateJs(props.page.assets)}
            </body>
        </html>
    );
};

Component.propTypes = {
    page: PropTypes.shape({
        title: PropTypes.string.isRequired,
        assets: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    state: PropTypes.object.isRequired,
    Component: PropTypes.elementType,
    componentProps: PropTypes.object
};

export default errorBoundary(Component);
