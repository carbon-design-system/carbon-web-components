/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../src/polyfills';
import { html } from 'lit-html'; // eslint-disable-line import/first
import addons from '@storybook/addons';
import { configure, addDecorator, addParameters, setCustomElements } from '@storybook/web-components'; // eslint-disable-line import/first
import { withKnobs } from '@storybook/addon-knobs';
import '../src/components/skip-to-content/skip-to-content';
import customElementsMetadata from '../custom-elements.json';
import { CURRENT_THEME } from './addon-carbon-theme/shared';
import theme from './theme';
import containerStyles from './_container.scss'; // eslint-disable-line import/first

setCustomElements(customElementsMetadata);

if (process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

const SORT_ORDER = ['introduction-welcome--page', 'introduction-form-paticipation--page', 'introduction-custom-styles--page'];

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

// The TS configuration for `@storybook/web-components` does not seem to allow returning `TemplateResult` in decorators,
// using `TemplateResult` in decorators seems to work with `@storybook/web-components` actually
// @ts-ignore
addDecorator(story => {
  const result = story();
  const { hasMainTag } = result as any;
  return html`
    <style>
      ${containerStyles}
    </style>
    <bx-skip-to-content href="#main-content"></bx-skip-to-content>
    <div
      id="main-content"
      name="main-content"
      data-floating-menu-container
      role="${hasMainTag ? 'none' : 'main'}"
      class="bx--body bx-ce-demo-devenv--container"
    >
      ${result}
    </div>
  `;
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

const reqDocs = require.context('../docs', true, /\-story\.mdx$/);
configure(reqDocs, module);

const reqComponents = require.context('../src/components', true, /\-story\.[jt]s$/);
configure(reqComponents, module);

if (module.hot) {
  module.hot.accept(reqComponents.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, '', currentLocationHref);
    window.location.reload();
  });
}
