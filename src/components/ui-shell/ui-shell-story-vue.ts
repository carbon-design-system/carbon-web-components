import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Fade16 from '@carbon/icons-vue/es/fade/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import './side-nav';
import './side-nav-items';
import './side-nav-link';
import './side-nav-menu';
import './side-nav-menu-item';
import './header';
import './header-nav';
import './header-nav-item';
import './header-menu';
import './header-menu-item';
import './header-menu-button';
import './header-name';

const createProps = () => ({
  expanded: boolean('Expanded (expanded)', true),
  fixed: boolean('Fixed (fixed)', false),
  href: text('Link href (href)', 'javascript:void 0'), // eslint-disable-line no-script-url
});

storiesOf('UI Shell', module)
  .addDecorator(withKnobs)
  .add('Side nav', () => ({
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
    ...createVueBindingsFromProps(createProps()),
  }))
  .add('Side nav with icons', () => ({
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
    ...createVueBindingsFromProps(createProps()),
  }))
  .add('Header', () => ({
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
    ...createVueBindingsFromProps(createProps()),
  }));
