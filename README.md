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

- [Getting started with development](#getting-started-with-development)
- [Running React/Angular demo](#running-reactangular-demo)
- [List of available components](#list-of-available-components)
- [Browser support](#browser-support)
- [Coding conventions](#coding-conventions)
- [Iteration plans](#iteration-plans)
- [Creating build](#creating-build)
  - [Trying out the bundled build](#trying-out-the-bundled-build)
  - [Trying out the ESM build in CodeSandbox](#trying-out-the-esm-build-in-codesandbox)
- [Running unit test](#running-unit-test)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started with development

1. Fork this repository and clone it
2. `yarn install`
3. `yarn storybook`

## Running React/Angular/Vue demo

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

## Coding conventions

Can be found at [here](./src/coding-conventions.md).

## Iteration plans

- [i1 (July 2019)](./plans/i1.md)
- [i2 (August 2019)](./plans/i2.md)
- [i3 (September 2019)](./plans/i3.md)

## Creating build

```
> gulp clean
> gulp build
```

You'll see the build artifacts in `/path/to/carbon-custom-elements/es` (ESM build) and `/path/to/carbon-custom-elements/public` (bundled build) directories.

### Trying out the bundled build

1. Fork this repo
2. Run `yarn install`
3. Run `gulp build:bundle`
4. Create a directory somewhere
5. Copy `/path/to/carbon-custom-elements/public/carbon-custom-elements-with-polyfills.js` the created directory
6. Create a HTML like below and put it to the same directory, open it in browser, and you'll see the Carbon button! 🎉

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="./carbon-custom-elements-with-polyfills.js"></script>
    <style type="text/css">
      body {
        font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <bx-btn>Foo</bx-btn>
  </body>
</html>
```

### Trying out the ESM build in CodeSandbox

1. Fork this repo
2. Run `yarn install`
3. Run `gulp build:modules`
4. Go to https://codesandbox.io/s/
5. Select Vanilla
6. Add dependencies (with Add Dependency button) to add the following
   - `lit-html` (Latest)
   - `lit-element` (Latest)
   - `classnames` (Latest)
   - `carbon-components` (`10.3.x`)
7. Add the following to the CodeSandbox (e.g. to `src` directory)
   - `/path/to/carbon-custom-elements/es/components/button/button.js`
   - `/path/to/carbon-custom-elements/es/components/button/button.css.js`
8. Go to `src/index.js` in the CodeSandbox and add something like `import "./button.js"`
9. Go to `index.html` in the CodeSandbox and add `<bx-btn>Foo</bx-btn>`
10. Reload the demo and you'll see the Carbon button! 🎉

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

Above options can be used together. This is useful to debug your code as you test:

```
> gulp test:unit -s tests/spec/dropdown_spec.ts -b Chrome -d -k
```
