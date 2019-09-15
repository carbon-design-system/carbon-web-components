# `bx-checkbox`

## `Rendering`

#### `Should render with minimum attributes`

```
<input
  aria-checked="false"
  class="bx--checkbox"
  id="__bx-ce-selectable-tile_id-foo"
  type="checkbox"
>
<label
  class="bx--checkbox-label"
  for="__bx-ce-selectable-tile_id-foo"
>
</label>

```

#### `Should render with various attributes`

```
<input
  aria-checked="mixed"
  class="bx--checkbox"
  disabled=""
  id="__bx-ce-selectable-tile_id-foo"
  name="name-foo"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--checkbox-label bx--visually-hidden"
  for="__bx-ce-selectable-tile_id-foo"
>
  label-text-foo
</label>

```
