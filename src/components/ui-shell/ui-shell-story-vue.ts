/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Fade16 from '@carbon/icons-vue/es/fade/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { sideNav as baseSideNav, sideNavWithIcons as baseSideNavWithIcons, header as baseHeader } from './ui-shell-story';

export { default } from './ui-shell-story';

export const sideNav = ({ parameters }) => ({
  template: `
    <bx-side-nav aria-label="Side navigation" :expanded="expanded" :fixed="fixed">
      <bx-side-nav-items>
        <bx-side-nav-menu title="L0 menu">
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item active aria-current="page" :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
        <bx-side-nav-link href="javascript:void(0)">L0 link</bx-side-nav-link>
      </bx-side-nav-items>
    </bx-side-nav>
    <!-- TODO: Figure out how to style the main content demo -->
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-side-nav']),
});

sideNav.story = baseSideNav.story;

export const sideNavWithIcons = ({ parameters }) => ({
  template: `
    <bx-side-nav aria-label="Side navigation" :expanded="expanded" :fixed="fixed">
      <bx-side-nav-items>
        <bx-side-nav-menu title="L0 menu">
          <fade-16 slot="title-icon"></fade-16>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <fade-16 slot="title-icon"></fade-16>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item active aria-current="page" :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-menu title="L0 menu">
          <fade-16 slot="title-icon"></fade-16>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
          <bx-side-nav-menu-item :href="href">
            L0 menu item
          </bx-side-nav-menu-item>
        </bx-side-nav-menu>
        <bx-side-nav-link href="javascript:void(0)">
          <fade-16 slot="title-icon"></fade-16>
          L0 link
        </bx-side-nav-link>
        <bx-side-nav-link href="javascript:void(0)">
          <fade-16 slot="title-icon"></fade-16>
          L0 link
        </bx-side-nav-link>
      </bx-side-nav-items>
    </bx-side-nav>
    <!-- TODO: Figure out how to style the main content demo -->
  `,
  components: {
    'fade-16': Fade16,
  },
  ...createVueBindingsFromProps(parameters?.props?.['bx-side-nav']),
});

sideNavWithIcons.story = baseSideNavWithIcons.story;

export const header = () => ({
  template: `
    <bx-header aria-label="IBM Platform Name">
      <bx-header-menu-button button-label-active="Close menu" button-label-inactive="Open menu"></bx-header-menu-button>
      <bx-header-name href="javascript:void 0" prefix="IBM">[Platform]</bx-header-name>
      <bx-header-nav menu-bar-label="IBM [Platform]">
        <bx-header-nav-item href="javascript:void 0">Link 1</bx-header-nav-item>
        <bx-header-nav-item href="javascript:void 0">Link 2</bx-header-nav-item>
        <bx-header-nav-item href="javascript:void 0">Link 3</bx-header-nav-item>
        <bx-header-menu menu-label="Link 4" trigger-content="Link 4">
          <bx-header-menu-item href="javascript:void 0">Sub-link 1</bx-header-menu-item>
          <bx-header-menu-item href="javascript:void 0">Sub-link 2</bx-header-menu-item>
          <bx-header-menu-item href="javascript:void 0">Sub-link 3</bx-header-menu-item>
        </bx-header-menu>
      </bx-header-nav>
    </bx-header>
    <!-- TODO: Figure out how to style the main content demo -->
  `,
});

header.story = baseHeader.story;
