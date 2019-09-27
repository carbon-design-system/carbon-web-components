# `bx-toggle`

## `Rendering`

#### `Should render with minimum attributes`

```
<input
  aria-checked="false"
  class="bx--toggle-input"
  id="__bx-ce-checkbox_id-foo"
  type="checkbox"
>
<label
  class="bx--toggle-input__label"
  for="__bx-ce-checkbox_id-foo"
>
  <slot name="label-text">
  </slot>
  <span class="bx--toggle__switch">
    <span
      aria-hidden="true"
      class="bx--toggle__text--off"
    >
      <slot name="off-text">
      </slot>
    </span>
    <span
      aria-hidden="true"
      class="bx--toggle__text--on"
    >
      <slot name="on-text">
      </slot>
    </span>
  </span>
</label>

```

#### `Should render with various attributes`

```
<input
  aria-checked="true"
  class="bx--toggle-input"
  disabled=""
  id="__bx-ce-checkbox_id-foo"
  name="name-foo"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--toggle-input__label"
  for="__bx-ce-checkbox_id-foo"
>
  <slot name="label-text">
    label-text-foo
  </slot>
  <span class="bx--toggle__switch">
    <span
      aria-hidden="true"
      class="bx--toggle__text--off"
    >
      <slot name="off-text">
        unchecked-text-foo
      </slot>
    </span>
    <span
      aria-hidden="true"
      class="bx--toggle__text--on"
    >
      <slot name="on-text">
        checked-text-foo
      </slot>
    </span>
  </span>
</label>

```
