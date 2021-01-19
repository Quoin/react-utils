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
  generateModuleAttributes
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
import namespace from './../namespace';

export default (path) => namespace(`COMPONENT_NAME${path ?  `.${path}` : ''}`);
```

Here, `COMPONENT_NAME` is your directory base name in upper-case.


## component.jsx <a name="component"></a>

This is the base component and should be stateless.

```javascript
import {
  errorBoundary,
  React,
} from '@quoin/react-utils';

import { NAME } from './constants';

const Component = ({
  click,
  counter,
}) => {
  // Some logic here.

  return (
    <div className=${NAME}>
      <div>Times clicked: {props.counter}</div>
      <div><span onClick={() => props.click()}>one more</span></div>
    </div>
  );
};

Component.displayName = NAME;

export default errorBoundary(Component);
```


## container.js <a name="container"></a>

We want to keep the connected components and disconnected components apart. So
if you need access to the state (eg: `useSelector()`, `useDispatch()`, etc),
this logic should be in this file.

```javascript
import {
  boundComponent,
  IState,
  useDispatch,
  useSelector
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
  getSubstateAttribute,
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

export const selectors = Object.freeze({
});

const DEFAULT_ROOT_STATE = Map();

export const reducer = concatenateReducers([{
}]);
```

### selectors

Since we know what data we need in the container, `selectors` is a good first
candidate.

```javascript
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
const actionCreators = Object.freeze({
  set: (counter) => actionCreator(actions.SET, { counter })
});
```


### actions

The key to the `actionCreator()` above needs to be set on the `actions`.

```javascript
const actions = namespacedActions(namespace, [
  'SET'
]);
```


### reducer

```javascript
export const reducer = concatenateReducers([{
  actions: [ actions.SET ],
  reducer: (state = DEFAULT_ROOT_STATE, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.COUNTER, action.payload?.counter)
}]);
```
