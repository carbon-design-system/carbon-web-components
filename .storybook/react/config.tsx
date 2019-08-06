import '../../src/polyfills';
import React, { StrictMode } from 'react';
import addons from '@storybook/addons';
import { configure, addDecorator, addParameters } from '@storybook/react'; // eslint-disable-line import/first
import '../components/focus-trap/focus-trap';
import { CURRENT_THEME } from '../addon-carbon-theme/shared';
import theme from './theme';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

addParameters({
  options: {
    theme: theme,
  },
});

addDecorator(
  story => <StrictMode>
    <style>
      {containerStyles.cssText}
    </style>
    <bx-ce-demo-focus-trap href="#main-content" aria-label="Skip to main content">Skip to main content</bx-ce-demo-focus-trap>
    <div id="main-content" data-floating-menu-container role="main" className="bx--body bx-ce-demo-devenv--container">
      {story()}
    </div>
    <bx-ce-demo-focus-trap href="#main-content" aria-label="End of content">End of content</bx-ce-demo-focus-trap>
  </StrictMode>
);

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

function loadStories() {
  const req = require.context('../../src/components', true, /\-story\-react\.[jt]sx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
