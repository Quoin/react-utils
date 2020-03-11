# How to create a component

This is the suggested usage for components. Each component should be in its own
directory:

    src/components/<component-name>

The folder name should be lowercase with dash separators.

Note: The folder is not under `client` because components are shared between the
client and server via SSR. See the [How to make SSR app](ssr.md) for more
details.

Here are the files in order of creation:

- [index.ts](#index)
- [constants.ts](#constants)
- [namespace.ts](#namespace) (if it's a connected component)
- [component.tsx](#component)
- [container.ts](#container) (if it's a connected component)
- [flux.ts](#flux) (if it's a connected component)

Even if `flux.ts` is a dependency of `container.ts`, it is created while
defining `container.js`, that's why it's later in the list.


## index.ts <a name="index"></a>

If you have a connected component:

```typescript
export { default } from './container';
export { reducers } from './flux'; // Only if it's a connected component with reducers
```

If you only have a stateless component:

```typescript
export { default } from './component';
```


## constants.ts <a name="constants"></a>

```typescript
export const NAME = 'counter-app';

// This only if you don't want to hard-code the attribute within your
// reducers/selectors
export const ATTRIBUTES: Readonly<{[index: string]: string}> = Object.freeze({
  COUNTER: 'counter'
});
```


## namespace.ts <a name="namespace"></a>

```typescript
import namespace from './../namespace';

export default (path?: string): string => namespace(`COMPONENT_NAME${path ?  `.${path}` : ''}`);
```

Here, `COMPONENT_NAME` is your directory base name in upper-case.


## component.tsx <a name="component"></a>

This is the base component and should be stateless.

```typescript
import {
  errorBoundary,
  React
} from '@quoin/react-utils';

import { NAME } from './constants';

interface Props {
    counter: number;
    click: Function
}

const Component: React.SFC<Props> = (props) => {
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


## container.ts <a name="container"></a>

We want to keep the connected components and disconnected components apart. So
if you need access to the state (eg: `useSelector()`, `useDispatch()`, etc),
this logic should be in this file.

```typescript
import {
  boundComponent,
  IState,
  useDispatch,
  useSelector
} from '@quoin/react-utils';

import { default as Component, Props } from './component';
import { orchestrators, selectors } from './flux';

const getComponentProps = (props: any): Props => {
  const dispatch = useDispatch();

  const counter = useSelector<IState, number>(selectors.counter);

  return {
    counter,
    click: () => orchestrators.click(dispatch, counter + 1)
  };
}

export default boundComponent(Component, getComponentProps);
```


## flux.ts <a name="flux"></a>

This file is where the flux flow is defined. We have decided to combine the
different parts into a single file instead of individual files because it was a
constant creation of new files, while most of the parts do not need to be
exported.


### General structure

I would usually start with the global structure:

```typescript
import { Map } from 'immutable';

import {
  concatenateReducers,
  getSubstateAttribute,
  namespacedActions
} from '@quoin/react-utils';

import { ATTRIBUTES } from './constants';
import namespace from './namespace';

const actions: { [index: string]: string } = namespacedActions(namespace, [
]);

interface ActionCreatorsInterface {
}

const actionCreators: Readonly<ActionCreatorsInterface> = Object.freeze({
});

interface OrchestratorsInterface {
}

export const orchestrators: Readonly<OrchestratorsInterface> = Object.freeze({
});

interface SelectorInterface {
}

export const selectors: Readonly<SelectorInterface> = Object.freeze({
});

const DEFAULT_ROOT_STATE = (Map() as IState);

export const reducers = concatenateReducers([{
}]);
```

### selectors

Since we know what data we need in the container, `selectors` is a good first
candidate.

```typescript
export const selectors: Readonly<SelectorInterface> = Object.freeze({
  counter: (state: IState): number => getSubstateAttribute(state, namespace, ATTRIBUTES.COUNTER, 0)
});
```


### orchestrators

Then are defined the interactions.

```typescript
export const orchestrators: Readonly<OrchestratorsInterface> = Object.freeze({
  click: (dispatch: Function, counter: number) => dispatch(actionCreators.set(counter))
});
```


### actionCreators

That defines what action creators are needed:

```typescript
const actionCreators: Readonly<ActionCreatorsInterface> = Object.freeze({
  set: (counter: number): IAction => actionCreator(actions.SET, { counter })
});
```


### actions

The key to the `actionCreator()` above needs to be set on the `actions`.

```typescript
const actions: { [index: string]: string } = namespacedActions(namespace, [
  'SET'
]);
```


### reducers

```typescript
export const reducers = concatenateReducers([{
  actions: [ actions.SET ],
  reducer: (state: IState = DEFAULT_ROOT_STATE, action: IAction): IState => setSubstateAttribute(state, namespace, ATTRIBUTES.COUNTER, action.payload?.counter)
}]);
```
