# Using custom styles in components

As Shadow DOM (one of the Web Components specs that `carbon-custom-elements` uses) promises, styles that `carbon-custom-elements` defines does not affect styles in your application, or vice versa.

However, in cases where your application or a Carbon-derived style guide wants to change the styles of our components, there are a few options.

## Using CSS Custom Properties

Changes to CSS Custom Properties of the Carbon theme are reflected in the color scheme of `carbon-custom-elements` components:

[![Edit carbon-custom-elements with custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/styling/theme-zoning)

For example, if you add CSS like below:

```css
footer {
  --cds-interactive-02: #6f6f6f; /* `$interactive-02` token for `g100` theme */
}
```

The color of the button in below code changes to one of `g100` theme:

```html
<footer>
  <bx-btn kind="secondary">Secondary button</bx-btn>
</footer>
```

The names of CSS Custom Properties you can use are the Carbon theme tokens prefixed with `--cds-`. The list of Carbon theme tokens can be found at [here](https://github.com/carbon-design-system/carbon/blob/v10.7.0/packages/themes/scss/generated/_themes.scss#L14-L454).

## Creating derived components with different style

You can create a derived class of our component and override [static `styles` property](https://lit-element.polymer-project.org/guide/styles#static-styles), like:

[![Edit carbon-custom-elements with custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-custom-elements/tree/master/examples/codesandbox/styling/custom-style)

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

## CSS Shadow Parts

In future, we'd like to support [CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/), too, so you can use your application's CSS to affect `carbon-custom-elements` styles in more flexible manner.
