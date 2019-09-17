A Carbon Design System variant that's as easy to use as native HTML elements, with no framework tax, no framework silo.

<p align="center">
  <a href="https://www.carbondesignsystem.com">
    <img alt="Carbon Design System" src="https://user-images.githubusercontent.com/3901764/57545698-ce5f2380-7320-11e9-8682-903df232d7b0.png" width="100%" />
  </a>
</p>

> Carbon is an open-source design system built by IBM. With the IBM Design
> Language as its foundation, the system consists of working code, design tools
> and resources, human interface guidelines, and a vibrant community of
> contributors.

<p align="center">
  <a href="https://github.com/carbon-design-system/carbon-custom-elements/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Carbon is released under the Apache-2.0 license" />
  </a>
</p>

# `carbon-custom-elements`

`carbon-custom-elements` is a variant of Carbon Design System with Custom Elements v1 and Shadow DOM v1 specs.

Experimental at this moment, with enthusiasm.

The effort stems from https://github.com/carbon-design-system/issue-tracking/issues/121. If you are interested in this project, adding 👍 to the description of that GH issue, or even contributing, will be greatly appreciated!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [Basic usage](#basic-usage)
  - [Angular](#angular)
  - [React](#react)
  - [Vue](#vue)
- [Getting started with development](#getting-started-with-development)
- [Running React/Angular/Vue Storybook demo](#running-reactangularvue-storybook-demo)
- [List of available components](#list-of-available-components)
- [Browser support](#browser-support)
- [Coding conventions](#coding-conventions)
- [Iteration plans](#iteration-plans)
- [Creating build](#creating-build)
- [Running unit test](#running-unit-test)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

To install `carbon-custom-elements` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S carbon-custom-elements carbon-components lit-html lit-element classnames lodash.findlast @babel/runtime
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-custom-elements carbon-components lit-html lit-element classnames lodash.findlast @babel/runtime
```

### Basic usage

Our example at [CodeSandbox](https://codesandbox.io) shows the most basic usage:

[![Edit carbon-custom-elements](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/basic)

The first thing you need is **setting up a module bundler** to resolve ECMAScript `import`s. Above example uses [Parcel](https://parceljs.org). You can use other bundlers like [Rollup](https://rollupjs.org/)/[Webpack](https://webpack.js.org), too.

Once you set up a module bundler, you can start importing our component modules, like:

```javascript
import 'carbon-custom-elements/es/components/dropdown/dropdown';
import 'carbon-custom-elements/es/components/dropdown/dropdown-item';
```

Once you do that, you can use our components in the same manner as native HTML tags, like:

```html
<bx-dropdown trigger-content="Select an item">
  <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
  <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
  <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
  <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
  <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
</bx-dropdown>
```

### Angular

[![Edit carbon-custom-elements with Angular](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/angular)

Angular users can use our components in the same manner as native HTML tags, too, once you add [`CUSTOM_ELEMENTS_SCHEMA`](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA) schema to your Angular module, like:

```javascript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### React

[![Edit carbon-custom-elements with React](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/react)

You can use wrapper React components in `carbon-custom-elements/es/components-react` that allows you to use our components seamlessly from your React code. Here's an example:

```javascript
import React from 'react';
import { render } from 'react-dom';
import BXDropdown from 'carbon-custom-elements/es/components-react/dropdown/dropdown';
import BXDropdownItem from 'carbon-custom-elements/es/components-react/dropdown/dropdown-item';

const App = () => (
  <BXDropdown triggerContent="Select an item">
    <BXDropdownItem value="all">Option 1</BXDropdownItem>
    <BXDropdownItem value="cloudFoundry">Option 2</BXDropdownItem>
    <BXDropdownItem value="staging">Option 3</BXDropdownItem>
    <BXDropdownItem value="dea">Option 4</BXDropdownItem>
    <BXDropdownItem value="router">Option 5</BXDropdownItem>
  </BXDropdown>
);

render(<App />, document.getElementById('root'));
```

### Vue

[![Edit carbon-custom-elements with Vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/vue)

Vue users can use our components in the same manner as native HTML tags, without any additional steps!

## Getting started with development

1. Fork this repository and clone it
2. `yarn install`
3. `yarn storybook`

## Running React/Angular/Vue Storybook demo

- React: `yarn storybook:react` (Live demo: https://carbon-custom-elements-react.netlify.com/)
- Angular: `yarn storybook:angular` (Live demo: https://carbon-custom-elements-angular.netlify.com/)
- Vue: `yarn storybook:vue` (Live demo: https://carbon-custom-elements-vue.netlify.com/)

## List of available components

View available web components at: https://carbon-custom-elements.netlify.com/. You can see usage information in several ways:

1. Clicking the **KNOBS** tab at the bottom and changing values there. Most knobs are shown as something like `Button kind (kind)`, where `kind` is the attribute name
2. Clicking the **ACTION LOGGER** tab at the bottom and interacting with the selected component. You may see something like `bx-modal-closed` which typically indicates that an event with such event type is fired. You can also expand the twistie to see the details of the event

## Browser support

- Latest Chrome/Safari/FF ESR
- IE/Edge support is bast-effort basis
  - Some components may not be supported

To support IE, you need a couple additional setups:

- Toolstack to re-transpile our cose to ES5 (e.g. by specifying IE11 in [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) configuration)
- Polyfills, listed [here](https://github.com/carbon-design-system/carbon-custom-elements/blob/master/src/polyfills/index.ts)

Here's an example code that shows such setup:

[![Edit carbon-custom-elements with IE](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/ie)

## Coding conventions

Can be found at [here](./src/coding-conventions.md).

## Iteration plans

- [i1 (July 2019)](./plans/i1.md)
- [i2 (August 2019)](./plans/i2.md)
- [i3 (September 2019)](./plans/i3.md)

## Creating build

```
> yarn clean
> yarn build
```

You'll see the build artifacts in `/path/to/carbon-custom-elements/es` directory.

## Running unit test

You can run unit test by:

```
> gulp test:unit
```

You can run specific test spec by:

```
> gulp test:unit -s tests/spec/dropdown_spec.ts
```

You can choose a browser (instead of Headless Chrome) by:

```
> gulp test:unit -b Firefox
```

You can keep the browser after the test (and re-run the test when files change) by:

```
> gulp test:unit -b Chrome -k
```

You can prevent code coverate instrumentation code from being generated by:

```
> gulp test:unit -d
```

You can update snapshots by:

```
> gulp test:unit --update-snapshot
```

Above options can be used together. This is useful to debug your code as you test:

```
> gulp test:unit -s tests/spec/dropdown_spec.ts -b Chrome -d -k
```
