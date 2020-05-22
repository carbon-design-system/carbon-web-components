# `bx-tile`

## `bx-clickable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="bx--link bx--tile bx--tile--clickable"
  href=""
>
  <slot>
  </slot>
</a>

```

####     `should render with various attributes`

```
<a
  class="bx--link bx--tile bx--tile--clickable bx--tile--light"
  href="about:blank"
>
  <slot>
  </slot>
</a>

```

## `bx-expandable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button
  aria-controls="below-the-fold-content"
  aria-expanded="false"
  aria-labelledby="above-the-fold-content"
  class="bx--tile__chevron"
>
</button>
<div
  class="bx--tile-content"
  id="content"
>
  <div id="above-the-fold-content">
    <slot name="above-the-fold-content">
    </slot>
  </div>
  <div id="below-the-fold-content">
    <slot>
    </slot>
  </div>
</div>

```

####     `should render with various attributes`

```
<button
  aria-controls="below-the-fold-content"
  aria-expanded="true"
  aria-labelledby="above-the-fold-content"
  class="bx--tile__chevron"
>
</button>
<div
  class="bx--tile-content"
  id="content"
>
  <div id="above-the-fold-content">
    <slot name="above-the-fold-content">
    </slot>
  </div>
  <div id="below-the-fold-content">
    <slot>
    </slot>
  </div>
</div>

```

## `bx-radio-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<input
  class="bx--tile-input"
  id="input"
  tabindex="-1"
  type="radio"
>
<label
  class="bx--tile bx--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="bx--tile__checkmark">
  </div>
  <div class="bx--tile-content">
    <slot>
    </slot>
  </div>
</label>

```

####     `should render with various attributes`

```
<input
  class="bx--tile-input"
  id="input"
  name="name-foo"
  tabindex="-1"
  type="radio"
  value="value-foo"
>
<label
  class="bx--tile bx--tile--light bx--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="bx--tile__checkmark">
  </div>
  <div class="bx--tile-content">
    <slot>
    </slot>
  </div>
</label>

```

## `bx-selectable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<input
  class="bx--tile-input"
  id="input"
  tabindex="-1"
  type="checkbox"
>
<label
  class="bx--tile bx--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="bx--tile__checkmark">
  </div>
  <div class="bx--tile-content">
    <slot>
    </slot>
  </div>
</label>

```

####     `should render with various attributes`

```
<input
  class="bx--tile-input"
  id="input"
  name="name-foo"
  tabindex="-1"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--tile bx--tile--light bx--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="bx--tile__checkmark">
  </div>
  <div class="bx--tile-content">
    <slot>
    </slot>
  </div>
</label>

```

