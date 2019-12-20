# Quoin's react utils

[![Build Status](https://travis-ci.com/Quoin/react-utils.svg?branch=master)](https://travis-ci.com/Quoin/react-utils)
[![Coverage Status](https://coveralls.io/repos/github/Quoin/react-utils/badge.svg?branch=master)](https://coveralls.io/github/Quoin/react-utils?branch=master)

Utility library to use React.


## File structure


### namespace.js

```javascript
import namespace from './../namespace';

export default (path) => namespace(`THIS-FOLDER${path ? `.${path}` : ''}`);
```


### flux.js

```javascript
import {
    actionCreator,
    namespacedActions
} from '@quoin/react-utils';

import namespace from './namespace';

const actions = namespacedActions(namespace, [
    'NO_PARAMS'
]);

const actionCreators = Object.freeze({
    noParams: () => actionCreator(actions.NO_PARAMS)
});
```
