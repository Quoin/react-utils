# Quoin's React utils library release notes

## 1.0.13 - 2020-10-02

- Adding `Component.displayName` to `<SSR>`.

## 1.0.12 - 2020-09-30

- `export { Helmet } from 'react-helmet';`

## 1.0.11 - 2020-08-26

- `export { default as Skeleton } from 'react-loading-skeleton';`

## 1.0.10 - 2020-08-21

- `export { Resource as HalResource, Link as HalLink } from 'hal';`

## 1.0.9 - 2020-08-18

- Fixed `flattenHal()` to verify attributes values are object first.

## 1.0.8 - 2020-08-18

- Adjust `flattenHal()` to convert any attributes if _links or _embedded present.

## 1.0.7 - 2020-08-18

- Adding `flattenHal()`.

## 1.0.6 - 2020-06-29

- Adding `generateClassname()` and `generateClassnameFromPrefix()`.

## 1.0.5 - 2020-06-27

- Exporting `useRef` from React.

## 1.0.4 - 2020-04-29

- Allow passing a `preRender(state)` parameter to `hydrateWithStore()`.

## 1.0.3 - 2020-04-24

- Allow to pass class to `<body>`.

## 1.0.2 - 2020-04-24

- Fixed propTypes to get `elementType`.

## 1.0.1 - 2020-04-24

- Fixed `<meta>` tags that don't require `content`.

## 1.0.0 - 2020-04-22

- #16: Converted back to JS-only.

## 0.1.4 - 2020-03-11

- Fixed return type for `ssrWithStore()` and added better documentation.

## 0.1.3 - 2020-03-10

- #14: store returned when hydrate allowing further processing.

## 0.1.2 - 2020-03-09

- #11: Extend SSR to handle meta, link and script tags.

## 0.0.11 - 2020-02-05

- Functionally working react-router

## 0.0.10 - 2020-02-04

- Adding `react-router-dom`.
- Removing initial state from page DOM.

## 0.0.9 - 2020-01-29

- Added `hydrateWithStore()`.

## 0.0.8 - 2020-01-27

- #2: Adding stryker mutator
- Fixed typo for `renderToString()`.
- Added `ssrWithStore()`.

## 0.0.7 - 2020-01-08

- Exporting `React`.

## 0.0.6 - 2020-01-07

- Adding `react-immutable-proptypes`.

## 0.0.5 - 2020-01-02

- Exporting `INIT_TYPE`.

## 0.0.4 - 2019-12-24

- Exporting `Provider`.

## 0.0.3 - 2019-12-24

- Exporting `getSubstate()`, `getSubstateAttribute()`, `setSubstate()`, and `setSubstateAttribute()`.

## 0.0.2 - 2019-12-24

- Adding `boundComponent()`.
- Exporting `errorBoundary()`.
- Exporting utility functions from `classnames`, `prop-types`, `react`, `react-dom`, `react-redux`.

## 0.0.1 - 2019-12-22

- Initial release to test if working.
