# Multi select

Multi select in `carbon-custom-elements` focuses on primitives consisting of the following:

| Tag                      | Description     |
| ------------------------ | --------------- |
| `<bx-multi-select>`      | The container   |
| `<bx-multi-select-item>` | The select item |

## Basic usage

In the most basic case, you can simply put `<bx-multi-select>` and `<bx-multi-select-item>` in a similar manner as putting `<select>`/`<option>` like below, and you'll get Carbon-styled multi select automatically. You can specify selected items via `<bx-multi-select-item>` via `selected` attribute, too:

```html
<bx-multi-select>
  <bx-multi-select-item>Foo</bx-multi-select-item>
  <bx-multi-select-item selected>Bar</bx-multi-select-item>
  <bx-multi-select-item>Baz</bx-multi-select-item>
</bx-multi-select>
```

Often you want to render the table rows/cells from your data. Below is an example of [`lit-html`](https://lit-html.polymer-project.org), but similar stories apply to React, Angular, Vue, Backbone, Knockout and many others:

```javascript
html`
  <bx-multi-select>
    ${items.map(
      item => html`
        <bx-multi-select-item ?selected=${item.selected}>${item.title}</bx-multi-select-item>
      `
    )}
  </bx-multi-select>
`;
```

## Selection

When user attempts to change selection in multi select item, `bx-multi-select-beingselected` event fires on `<bx-multi-select>`, which has the following properties in the event details:

| Property | Description                                                    |
| -------- | -------------------------------------------------------------- |
| `item`   | The `<bx-multi-select-item>` whose selection is being changed. |

`bx-multi-select-beingselected` bubbles and is cancelable. Canceling this event means canceling change in selection.

## Note on keyboard navigation

Similar to native `<select>`, `<bx-multi-select>` keeps focusing on itself even while the menu is open and user is navigating through arrow keys. Given that, `<bx-multi-select-item>` does not handle keyboard events by itself. `<bx-multi-select>` takes care of handling keyboard events for multi select items and updates `<bx-multi-select-item>`.
