import '../src/polyfills';
import { html } from 'lit-html'; // eslint-disable-line import/first
import { configure, addDecorator } from '@storybook/polymer'; // eslint-disable-line import/first
import containerStyles from './_container.scss'; // eslint-disable-line import/first

addDecorator(
  story => html`
    <style>
      ${containerStyles}
    </style>
    <div
      data-floating-menu-container
      role="main"
      class="bx--body"
      style="padding: 3em; display: flex; flex-direction: column; align-items: center"
    >
      ${story()}
    </div>
    <input aria-label="input-text-offleft" type="text" class="bx--visually-hidden" />
  `
);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.[jt]s$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
