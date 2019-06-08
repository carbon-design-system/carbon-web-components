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

## Getting started with development

1. Fork this repository and clone it
2. `yarn install`
3. `yarn storybook`

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

- [i0 (prototype)](./plans/i0.md)
