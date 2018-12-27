import '@webcomponents/custom-elements';
import '@webcomponents/shadydom';
import { html } from 'lit-html';
import { configure, addDecorator } from '@storybook/polymer';
import containerStyles from './_container.scss';

addDecorator(story => html`<style>${containerStyles}</style>
<div
  data-floating-menu-container
  role="main"
  style="padding: 3em; display: flex; flex-direction: column; align-items: center">
  ${story()}
</div>
<input
  aria-label="input-text-offleft"
  type="text"
  class="bx--visually-hidden"
/>`);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
