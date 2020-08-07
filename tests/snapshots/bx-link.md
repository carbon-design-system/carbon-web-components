# `bx-link`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--link"
  href="about:blank"
  id="link"
>
  <slot>
  </slot>
</a>

```

####   `should render with various attributes`

```
<a
  class="bx--link"
  download="file-name-foo"
  href="about:blank"
  hreflang="en"
  id="link"
  ping="about:blank"
  rel="noopener"
  role="button"
  target="_blank"
  type="text/plain"
>
  <slot>
  </slot>
</a>

```

####   `should render disabled state`

```
<p
  class="bx--link bx--link--disabled"
  id="link"
>
  <slot>
  </slot>
</p>

```

