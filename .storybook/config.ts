import '../src/polyfills';
import { html } from 'lit-html'; // eslint-disable-line import/first
import { configure, addDecorator } from '@storybook/polymer'; // eslint-disable-line import/first
import './components/focus-trap/focus-trap';
import containerStyles from './_container.scss'; // eslint-disable-line import/first

addDecorator(
  story => html`
    <style>
      ${containerStyles}
    </style>
    <bx-ce-demo-focus-trap href="#main-content" aria-label="Skip to main content">Skip to main content</bx-ce-demo-focus-trap>
    <div name="main-content" data-floating-menu-container role="main" class="bx--body bx-ce-demo-devenv--container">
      ${story()}
    </div>
    <bx-ce-demo-focus-trap href="#main-content" aria-label="End of content">End of content</bx-ce-demo-focus-trap>
  `
);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.[jt]s$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
