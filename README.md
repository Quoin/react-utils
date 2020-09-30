# Quoin's react utils

[![Build Status](https://travis-ci.com/Quoin/react-utils.svg?branch=master)](https://travis-ci.com/Quoin/react-utils)
[![Coverage Status](https://coveralls.io/repos/github/Quoin/react-utils/badge.svg?branch=master)](https://coveralls.io/github/Quoin/react-utils?branch=master)
[![npm version](https://img.shields.io/npm/v/@quoin/react-utils.svg)](https://www.npmjs.com/package/@quoin/react-utils)


Utility library to use React.


## Warning

The library expects `React` to be global, because it usually comes from an
external lib and not bundled with `webpack`, so the easiest when using on the
server-side is to declare it global inside your start script:

```
# server.js

import React from 'react';

global.React = React;
```


## Usage

- See [How to create a component](component.md)
- See [How to make SSR app](ssr.md)
- See [How to configure React Router](routes-info.md)

## Chrome DevTools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
