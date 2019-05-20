<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Coding conventions](#coding-conventions)
  - [Linters/formatters](#lintersformatters)
  - [TSDoc comments](#tsdoc-comments)
  - [Lifecycle management](#lifecycle-management)
  - [Component styles for different component states/variants](#component-styles-for-different-component-statesvariants)
  - [Customizing components](#customizing-components)
    - [Defining (default) component options](#defining-default-component-options)
    - [Component variants with different options](#component-variants-with-different-options)
      - [Areas to make them configurable as component options](#areas-to-make-them-configurable-as-component-options)
      - [Areas where component optinos are _not_ applied](#areas-where-component-optinos-are-_not_-applied)
  - [Polymorphism with static properties](#polymorphism-with-static-properties)
  - [Custom events](#custom-events)
  - [Custom element registration](#custom-element-registration)
  - [Propagating misc attributes from shadow host to an element in shadow DOM](#propagating-misc-attributes-from-shadow-host-to-an-element-in-shadow-dom)
    <!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Coding conventions

## Linters/formatters

`carbon-custom-elements` uses ESLint with `typescript-eslint` for linting, and Prettier for code formatting.
Most of ESLint configurations are same as ones in `carbon-components`.

## TSDoc comments

In addition to using TypeScript, we try to leverage editors' code assistance feature as much as possible.

For that purpose, we add TSDoc comments to the following:

- All classes
- All properties/methods (including private properties), only exception here is one being overriden
- All type definitions (e.g. `interface`, `enum`)

## Lifecycle management

To avoid memory leaks and zombie event listeners, we ensure the event listeners on custom elements themselves (hosts) and ones on `document`, etc. are released when they get out of render tree.

For that purpose, `carbon-custom-elements` uses [`on()` API from `carbon-components`](https://github.com/carbon-design-system/carbon/blob/v10.2.0/src/globals/js/misc/on.js), a thin sugar layer of `.addEventListener()`.

[`on(element, type, listener, options)`](<(https://github.com/carbon-design-system/carbon/blob/v10.2.0/src/globals/js/misc/on.js)>) calls `element.addEventListener(type, listener, options)` and returns a ["handle" object with `.release()` method](https://github.com/carbon-design-system/carbon-custom-elements/blob/8d7dee3/src/typings/vendor.d.ts#L1-L10). `.release()` method releases the event listener.

Here's an example seen in `<bx-modal>` code:

```typescript
import on from 'carbon-components/es/globals/js/misc/on';

...

@customElement(`${prefix}-modal` as any)
class BXModal extends LitElement {
  ...

  connectedCallback() {
    super.connectedCallback();
    this._hClick = on(this, 'click', this._handleClick);
  }

  disconnectedCallback() {
    if (this._hClick) {
      this._hClick = this._hClick.release();
    }
    super.disconnectedCallback();
  }

  ...
}
```

## Component styles for different component states/variants

Carbon core CSS uses BEM modifier like `bx--btn--danger` to style different states/variants of a component.

OTOH `carbon-custom-elements` uses attributes to represent different states/variants (e.g. `<bx-btn type="danger">`), in a similar mannaer as how attributes influence states/variants of native elements (e.g. `<input type="hidden">`).

If such states/variants should affect the style of custom element (shadow host), we define attribute styles.

## Customizing components

Like `carbon-components` library does, `carbon-custom-elements` ensures components are written in a flexible manner enough to support use cases different applications have.

### Defining (default) component options

Component options are defined as static properties of custom element class, instead of in `options` object seen in `carbon-components`.

The primary reason for the difference is that [there is no support for constructor arguments in Custom Elements](https://github.com/w3c/webcomponents/issues/605) and the use case for using constructor for Custom Elements is rare. It makes instance-level configuration unrealistic.

### Component variants with different options

A component variant with different options can be created by creating a derived class which overrides static properties of component options.

#### Areas to make them configurable as component options

- CSS selectors/classes used in imperative DOM API calls (Doing so allows overriding `.render()` method)
- [Custom event](#custom-events) names

#### Areas where component optinos are _not_ applied

- CSS classes used in template (Should be done by overriding `.render()` method)

## Polymorphism with static properties

To support [polymorphism with static properties](https://github.com/Microsoft/TypeScript/issues/3841)...

We do:

```typescript
(this.constructor as typeof CustomElementClass).staticPropName;
```

```typescript
(customElementInstance.constructor as typeof CustomElementClass).staticPropName;
```

We don't:

```typescript
CustomElementClass.staticPropName;
```

## Custom events

Wherever it makes sense, `carbon-custom-elements` translates user-initiated events to something that gives event listeners more context of what they mean. For example, `<bx-modal>` translates `click` event on `<bx-modal-close-button>` to `bx-modal-beingclosed` and `bx-modal-closed` custom events.

`bx-modal-beingclosed` is cancelable in a similar manner as how `click` event on `<a href="...">` is cancelable; If `bx-modal-beingclosed` is canceled, `<bx-modal>` stops closing itself.

We define custom event names as static properties so derived classes can customize them.

## Custom element registration

This library registers custom elements to global `window` automatically upon importing the corresponding modules.
It may not be desirable in two scenarios:

- One is when consumer wants to customize our custom element's behavior before it's registered. In such case, consumer can create a derived class and register it with a different custom element name.
- Another, though the use case is rare, is using our custom element in a different realm. In such case, consumer can re-register the custom element in the realm.

## Propagating misc attributes from shadow host to an element in shadow DOM

Some components, e.g. `<bx-btn>`, simply represent the content in shadow DOM, e.g. `<button>` in it. It's sometimes desiable for applications to have control of attributes in `<button>`, for example, adding `data-` attributes there.

In such case, we let consumer create a derived class. For example, its `.attributeChangedCallback()` can propagate `<bx-btn>`'s attribute to `<button>` in it.
