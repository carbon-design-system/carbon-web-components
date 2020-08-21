/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import addons from '@storybook/addons';
import { CURRENT_THEME } from './addon-carbon-theme/shared';
import theme from './theme';
import container from './container';

if (process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

const SORT_ORDER = ['introduction-welcome--page', 'introduction-form-paticipation--page', 'introduction-custom-styles--page'];

export const parameters = {
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
};

export const decorators = [
  function decoratorContainer(story) {
    const result = story();
    const { hasMainTag } = result as any;
    return container({ hasMainTag, children: result });
  },
  function decoratorParameters(story, { parameters }) {
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
  },
];
