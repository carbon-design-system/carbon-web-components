# UI Shell

UI Shell in Carbon Design System consists of several component groups.

## Side nav

Side nav in UI Shell consists of the following components:

| Tag                    | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `<side-nav>`           | The top-level container                          |
| `<side-nav-item>`      | The container of the nav items                   |
| `<side-nav-link>`      | Nav item, working as a link                      |
| `<side-nav-menu>`      | Nav item, working as a container of sub-items    |
| `<side-nav-menu-item>` | Nav item, working as as a sub-item and as a link |

### Expanding/collapsing

`<bx-side-nav>` has `expanded` attribute to make it expanded. In its collapsed state, hovering over the side nav expands it temporarily.

`<bx-side-nav>` can be made non-collapsible, by setting `fixed` attribute.

### Selecting a nav item

Unlike `<bx-dropdown>`, etc., user gesture of side nav item won't update the selection by itself. The assumption is that following the link in `<side-nav-link>`/`<side-nav-menu-item>` triggers routing in application, and application chooses which `<side-nav-link>`/`<side-nav-menu-item>` to set `active` attribute to, with the new URL.

## Header nav

Header nav in UI Shell consists of the following components:

| Tag                       | Description                                   |
| ------------------------- | --------------------------------------------- |
| `<bx-header>`             | The top-level container                       |
| `<bx-header-nav>`         | The nav bar                                   |
| `<bx-header-nav-item>`    | Nav item                                      |
| `<bx-header-menu>`        | Nav item, working as a container of sub-items |
| `<bx-header-menu-item>`   | Nav item, working as as a sub-item            |
| `<bx-header-menu-button>` | The expando button for side nav               |
| `<bx-header-name>`        | The UI to show product name                   |
