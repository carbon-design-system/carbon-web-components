/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../src/polyfills';

import addons from '@storybook/addons';
import { configure, addDecorator, addParameters } from '@storybook/angular';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withKnobs } from '@storybook/addon-knobs';
import '../components/focus-trap/focus-trap';
import { CURRENT_THEME } from '../addon-carbon-theme/shared';
import theme from './theme';
import DocsPage from '../DocsPage';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    theme: theme,
  },
});

addDecorator(story => {
  const { template, ...rest } = story();
  // Makes the style global instead of letting Angular scope it
  const { cssText } = containerStyles;
  let containerStyleNode = document.getElementById('container-style');
  if (!containerStyleNode) {
    containerStyleNode = document.createElement('style');
    containerStyleNode.setAttribute('type', 'text/css');
    containerStyleNode.appendChild(document.createTextNode(cssText));
    document.head.appendChild(containerStyleNode);
  } else {
    containerStyleNode.textContent = cssText;
  }
  return {
    ...rest,
    template: `
      <a href="#main-content" class="bx--assistive-text" aria-label="Skip to main content">Skip to main content</a>
      <div id="main-content" data-floating-menu-container role="main" class="bx--body bx-ce-demo-devenv--container">
        ${template}
      </div>
      <a href="#main-content" class="bx--assistive-text" aria-label="End of content">End of content</a>
    `,
  };
});

addDecorator(withKnobs);

addDecorator((story, { parameters }) => {
  const { knobs } = parameters;
  if (Object(knobs) === knobs) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(knobs).forEach(name => {
      if (typeof knobs[name] === 'function') {
        parameters.props[name] = knobs[name]();
      }
    });
  }
  return story();
});

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

const req = require.context('../../src/components', true, /\-story\-angular\.[jt]s$/);
configure(req, module);
