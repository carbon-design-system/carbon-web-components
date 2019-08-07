# Check box

Check box in `carbon-custom-elements` represents a combination of a check box and its label.

## Basic usage

Regular checkbox:

```html
<bx-checkbox checked label-text="Checkbox" />
```

Indeterminate state:

```html
<bx-checkbox indeterminate label-text="Checkbox" />
```

## Available attributes

Please refer to Knobs tab at the bottom at: https://carbon-custom-elements.netlify.com/?path=/story/checkbox--default

## Event

Unlike regular checkbox, `<bx-checkbox>` does _not_ fire `change` event. Please use `input` event instead.
