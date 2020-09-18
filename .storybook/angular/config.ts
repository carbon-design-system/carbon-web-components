/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../src/polyfills';

import addons from '@storybook/addons';
import { configure, addDecorator, addParameters } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import '../../src/components/skip-to-content/skip-to-content';
import { CURRENT_THEME } from '../addon-carbon-theme/shared';
import theme from './theme';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

const SORT_ORDER = ['introduction-welcome--page', 'introduction-form-paticipation--page'];

addParameters({
  options: {
    showRoots: true,
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
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
      <bx-skip-to-content href="#main-content"></bx-skip-to-content>
      <div id="main-content" data-floating-menu-container role="main" class="bx--body bx-ce-demo-devenv--container">
        ${template}
      </div>
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

const reqDocs = require.context('../../docs', true, /\-story\-angular\.mdx$/);
configure(reqDocs, module);

const reqComponents = require.context('../../src/components', true, /\-story\-angular\.[jt]s$/);
configure(reqComponents, module);
