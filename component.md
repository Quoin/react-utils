# How to create a component

This is the suggested usage for components. Each component should be in its own
directory:

    src/components/<component-name>

The folder name should be lowercase with dash separators.

Note: The folder is not under `client` because components are shared between the
client and server via SSR. See the [How to make SSR app](ssr.md) for more
details.

Here are the files in order of creation:

- [index.js](#index)
- [constants.js](#constants)
- [namespace.js](#namespace) (if it's a connected component)
- [component.jsx](#component)
- [container.js](#container) (if it's a connected component)
- [flux.js](#flux) (if it's a connected component)

Even if `flux.js` is a dependency of `container.js`, it is created while
defining `container.js`, that's why it's later in the list.


## index.js <a name="index"></a>

If you have a connected component:

```javascript
export { default } from './container';
export { reducer } from './flux'; // Only if it's a connected component with reducer
```

If you only have a stateless component:

```javascript
export { default } from './component';
```


## constants.js <a name="constants"></a>

```javascript
import {
  generateClassnamesWithPrefix,
  generateModuleAttributes,
} from '@quoin/react-utils';

import { ROOT_PREFIX } from '....../constants';

export const NAME = 'CounterApp';

// This only if you don't want to hard-code the attribute within your
// reducer/selectors
export const ATTRIBUTES = generateModuleAttributes(NAME, [
  'COUNTER',
]);

export const CLASSNAMES = generateClassnamesWithPrefix([ROOT_PREFIX, NAME], [
  'SOME_CLASS',
  'OTHER_CLASS',
]);
```


## namespace.js <a name="namespace"></a>

```javascript
import { buildNamespace } from '@quoin/react-utils';

import namespace from '../namespace';

import { NAME } from './constants';

export default (path) => buildNamespace(namespace, NAME, path);
```

Here, `COMPONENT_NAME` is your directory base name in upper-case.


## component.jsx <a name="component"></a>

This is the base component and should be stateless.

```javascript
import {
  errorBoundary,
  PropTypes,
} from '@quoin/react-utils';

import { NAME } from './constants';

const Component = ({
  click,
  counter,
}) => {
  // Some logic here.

  return (
    <div className=${NAME}>
      <div>Times clicked: {counter}</div>
      <div><span onClick={click}>one more</span></div>
    </div>
  );
};

Component.displayName = NAME;

Component.propTypes = {
  click: PropTypes.func.isRequired,
  counter: PropTypes.number,
};

Component.defaultProps = {
  counter: 0,
};

export default errorBoundary(Component);
```


## container.js <a name="container"></a>

We want to keep the connected components and disconnected components apart. So
if you need access to the state (eg: `useSelector()`, `useDispatch()`, etc),
this logic should be in this file.

```javascript
import {
  boundComponent,
  useDispatch,
  useSelector,
} from '@quoin/react-utils';

import Component from './component';
import { orchestrators, selectors } from './flux';

const getComponentProps = (props) => {
  const dispatch = useDispatch();

  const counter = useSelector(selectors.counter);

  return {
    counter,
    click: () => orchestrators.click(dispatch, counter + 1)
  };
}

export default boundComponent(Component, getComponentProps);
```


## flux.js <a name="flux"></a>

This file is where the flux flow is defined. We have decided to combine the
different parts into a single file instead of individual files because it was a
constant creation of new files, while most of the parts do not need to be
exported.


### General structure

I would usually start with the global structure:

```javascript
import { Map } from 'immutable';

import {
  concatenateReducers,
  namespacedActions
} from '@quoin/react-utils';

import { ATTRIBUTES } from './constants';
import namespace from './namespace';

const actions = namespacedActions(namespace, [
]);

const actionCreators = Object.freeze({
});

export const orchestrators = Object.freeze({
});

// This one is placed before reducer because I, some times, use a selector
// inside of the reducer to avoid logic duplication.
export const selectors = Object.freeze({
});

export const reducer = concatenateReducers([{
}]);
```

### selectors

Since we know what data we need in the container, `selectors` is a good first
candidate.

```javascript
import { getSubstateAttribute } from '@quoin/react-utils';

export const selectors = Object.freeze({
  counter: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.COUNTER, 0)
});
```


### orchestrators

Then are defined the interactions.

```javascript
export const orchestrators = Object.freeze({
  click: (dispatch, counter) => dispatch(actionCreators.set(counter))
});
```


### actionCreators

That defines what action creators are needed:

```javascript
import { actionCreator } from '@quoin/react-utils';

const actionCreators = Object.freeze({
  set: (counter) => actionCreator(actions.SET, { counter })
});
```


### actions

The key to the `actionCreator()` above needs to be set on the `actions`.

```javascript
import { namespacedActions } from '@quoin/react-utils';

const actions = namespacedActions(namespace, [
  'SET'
]);
```


### reducer

```javascript
export const reducer = concatenateReducers([{
  actions: [ actions.SET ],
  reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.COUNTER, action.payload?.counter)
}]);
```

### setAttribute() as generic

I've later realized that I could reduce code by using a generic `setAttribute()`
action.

```javascript
const actions = namespacedActions(namespace, [
  'SET_ATTRIBUTE',
]);

const actionCreators = Object.freeze({
  setAttribute: (attribute, value) => actionCreator(action.SET_ATTRIBUTE, { attribute, value }),
});

export const orchestrators = Object.freeze({
  someSpecific: (dispatch, values) => {
    // Do something non-generic.
  },
  // Keeping specific to make it simple for the container.
  setVariable1: (dispatch, value) => dispatch(actionCreators.setAttribute(ATTRIBUTES.VARIABLE1, value)),
  setVariable2: (dispatch, value) => dispatch(actionCreators.setAttribute(ATTRIBUTES.VARIABLE2, value)),
  setVariable3: (dispatch, value) => dispatch(actionCreators.setAttribute(ATTRIBUTES.VARIABLE3, value)),
  setVariable4: (dispatch, value) => dispatch(actionCreators.setAttribute(ATTRIBUTES.VARIABLE4, value)),
  setVariable5: (dispatch, value) => dispatch(actionCreators.setAttribute(ATTRIBUTES.VARIABLE5, value)),
});

export const selectors = Object.freeze({
  // Keeping specific to make it simple for the container.
  variable1: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.VARIABLE1, someDefault),
  variable2: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.VARIABLE2, fromJS({})).toJSON(),
  variable3: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.VARIABLE3, someDefault),
  variable4: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.VARIABLE4, someDefault),
  variable5: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.VARIABLE5, someDefault),
});

export const reducer = concatenateReducers([{
  actions: [actions.SET_ATTRIBUTE],
  reducer: (state, action) => setSubstateAttribute(state, namespace, action.payload.attribute, fromJS(action.payload.value)),
}]);
```
