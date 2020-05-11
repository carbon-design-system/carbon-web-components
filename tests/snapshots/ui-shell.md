# `ui-shell`

## `bx-header-menu-button`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button class="bx--header__action bx--header__menu-toggle bx--header__menu-trigger">
</button>

```

####     `should render with various attributes for inactive state`

```
<button
  aria-label="button-label-inactive"
  class="bx--header__action bx--header__menu-toggle bx--header__menu-trigger"
  disabled=""
>
</button>

```

####     `should render with various attributes for active state`

```
<button
  aria-label="button-label-active"
  class="bx--header__action bx--header__action--active bx--header__menu-toggle bx--header__menu-trigger"
  disabled=""
>
</button>

```

## `bx-header-menu`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  aria-expanded="false"
  aria-haspopup="menu"
  class="bx--header__menu-item bx--header__menu-title"
  href="javascript:void 0"
  role="menuitem"
  tabindex="0"
>
</a>
<ul
  class="bx--header__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```

####     `should render with various attributes`

```
<a
  aria-expanded="true"
  aria-haspopup="menu"
  class="bx--header__menu-item bx--header__menu-title"
  href="javascript:void 0"
  role="menuitem"
  tabindex="0"
>
  trigger-content-foo
</a>
<ul
  aria-label="menu-label-foo"
  class="bx--header__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```

## `bx-header-name`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a class="bx--header__name">
  <slot>
  </slot>
</a>

```

####     `should render with various attributes`

```
<a
  class="bx--header__name"
  href="about:blank"
>
  <span class="bx--header__name--prefix">
    prefix-foo
  </span>
  <slot>
  </slot>
</a>

```

## `bx-header-nav`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div class="bx-ce--header__divider">
</div>
<ul
  aria-label="undefined"
  class="bx--header__menu-bar"
  role="menubar"
>
  <slot>
  </slot>
</ul>

```

####     `should render with various attributes`

```
<div class="bx-ce--header__divider">
</div>
<ul
  aria-label="menu-bar-label-foo"
  class="bx--header__menu-bar"
  role="menubar"
>
  <slot>
  </slot>
</ul>

```

## `bx-header-nav-item`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="bx--header__menu-item"
  role="menuitem"
  tabindex="0"
>
  <span class="bx--text-truncate--end">
    <slot>
    </slot>
  </span>
</a>

```

####     `should render with various attributes`

```
<a
  class="bx--header__menu-item"
  href="about:blank"
  role="menuitem"
  tabindex="0"
>
  <span class="bx--text-truncate--end">
    <slot>
    </slot>
  </span>
</a>

```

## `bx-side-nav-link`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="bx--side-nav__link"
  href=""
>
  <div
    class="bx--side-nav__icon"
    hidden=""
    id="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span class="bx--side-nav__link-text">
    <slot>
    </slot>
  </span>
</a>

```

####     `should render with various attributes`

```
<a
  class="bx--side-nav__link bx--side-nav__link--current"
  href="about:blank"
>
  <div
    class="bx--side-nav__icon"
    id="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span class="bx--side-nav__link-text">
    <slot>
    </slot>
  </span>
</a>

```

## `bx-side-nav-menu`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button
  aria-expanded="false"
  aria-haspopup="true"
  class="bx--side-nav__submenu"
  type="button"
>
  <div
    class="bx--side-nav__icon"
    hidden=""
    id="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span class="bx--side-nav__submenu-title">
  </span>
  <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
  </div>
</button>
<ul
  class="bx--side-nav__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```

####     `should render with various attributes`

```
<button
  aria-expanded="true"
  aria-haspopup="true"
  class="bx--side-nav__submenu"
  type="button"
>
  <div
    class="bx--side-nav__icon"
    hidden=""
    id="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span class="bx--side-nav__submenu-title">
    title-foo
  </span>
  <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
  </div>
</button>
<ul
  class="bx--side-nav__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```

####     `should support collapsing side nav menu upon parent side nav is collapsed as rail`

```
<button
  aria-expanded="false"
  aria-haspopup="true"
  class="bx--side-nav__submenu"
  type="button"
>
  <div
    class="bx--side-nav__icon"
    hidden=""
    id="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span class="bx--side-nav__submenu-title">
  </span>
  <div class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
  </div>
</button>
<ul
  class="bx--side-nav__menu"
  role="menu"
>
  <slot>
  </slot>
</ul>

```

## `bx-side-nav-menu-item`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="bx--side-nav__link"
  href=""
  role="menuitem"
>
  <span class="bx--side-nav__link-text">
    <slot>
    </slot>
  </span>
</a>

```

####     `should render with various attributes`

```
<a
  class="bx--side-nav__link bx--side-nav__link--current"
  href="about:blank"
  role="menuitem"
>
  <span class="bx--side-nav__link-text">
    <slot>
    </slot>
  </span>
</a>

```

