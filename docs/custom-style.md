# Using custom styles in components

As Shadow DOM (one of the Web Components specs that `carbon-custom-elements` uses) promises, styles that `carbon-custom-elements` defines does not affect styles in your application, or vice versa.

However, there are cases where your application, or a Carbon-derived style guide, wants to change styles of our components. For that, you can create a derived class of our component and override [static `styles` property](https://lit-element.polymer-project.org/guide/styles#static-styles), like:

[![Edit carbon-custom-elements with custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/custom-style)

```javascript
import { css, customElement } from 'lit-element';
import BXDropdown from 'carbon-custom-elements/es/components/dropdown/dropdown';

@customElement('my-dropdown')
class MyDropdown extends BXDropdown {
  // Custom CSS to enforce `field-02` (light) style of the dropdown
  static styles = css`
    ${BXDropdown.styles}
    .bx--list-box {
      background-color: white;
    }
  `;
}
```

In future, we'd like to support the following so you can use your application's CSS to affect `carbon-custom-elements` styles:

- CSS Custom Properties (soon)
- [CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/) (When all major browsers support it)
