# Coding conventions

## Component options

Like `carbon-components` library does, `carbon-custom-elements` ensures components are written in a flexible manner enough to support use cases different applications have.

### Defining (default) component options

Component options are defined as static properties of custom element class, instead of in `options` object seen in `carbon-components`.

The primary reason for the difference is that [there is no support for constructor arguments in Custom Elements](https://github.com/w3c/webcomponents/issues/605) and the use case for using constructor for Custom Elements is rare. It makes instance-level configuration unrealistic.

### Component variants with different options

A component variant with different options can be created by creating a Custom Element class derived from the original class, and overriding component options.

### Areas to make them configurable as component options

- Custom Element name (`.is()`)
- Template rendering method (`.template()`)
- CSS selectors/classes used in imperative DOM API calls

### Areas where component optinos are _not_ applied

- CSS classes used in template (Simpler to override the template as a whole)

### Referring to component options

Use `this.constructor.optionName`/`customElementInstance.constructor.optionName` syntax instead of `CustomElementClass.optionName` to make sure inheritance of component class (with different options, etc.) work.

## Custom element registration

This library registers custom elements to global `window` as soon as modules containing component code is imported. Some guidances for where this behavior may be intrusive:

- You can manually register them to different windows
- Custom elements derived from ones in this library should use different custom element names for registration
