# Quoin's react utils

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
