# How to configure React Router

Routes info is basically used to have variables in `<Link>` components.

With the following definition:

```typescript
export const ROUTES_INFO: IRoute[] = [{
  name: 'home',
  path: '/',
  template: App,
  route: 'home'
}];
```

In your `component.tsx` (or any code), you will be able to use:

```typescript
import {
  Route,
  Switch
} from '@quoin/react-utils';
```

and in your JSX:

to define what component to display:

```jsx
<Switch>
  <Route exact path={RoutesInfo.path('home')} component={Home} />
  <Route component={NotFound} />
</Switch>
```

or to link:

```jsx
<Link to={RoutesInfo.to('home', {})}>Home</Link>
```
