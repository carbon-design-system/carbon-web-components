# `bx-checkbox`

## `Rendering`

#### `Should render with minimum attributes`

```
<input
  aria-checked="false"
  class="bx--checkbox"
  id="checkbox"
  type="checkbox"
>
<label
  class="bx--checkbox-label"
  for="checkbox"
>
  <slot>
  </slot>
</label>

```

#### `Should render with various attributes`

```
<input
  aria-checked="mixed"
  class="bx--checkbox"
  disabled=""
  id="checkbox"
  name="name-foo"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--checkbox-label bx--visually-hidden"
  for="checkbox"
>
  <slot>
    label-text-foo
  </slot>
</label>

```
