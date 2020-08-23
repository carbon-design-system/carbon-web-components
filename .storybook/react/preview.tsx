/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import addons from '@storybook/addons';
import theme from './theme';
import Container from './Container';

addons.setConfig({
  showRoots: true,
  theme: theme,
});

const SORT_ORDER = ['introduction-welcome--page', 'introduction-form-paticipation--page'];

export const parameters = {
  options: {
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
  },
};

export const decorators = [
  story => {
    const result = story();
    const { hasMainTag } = result as any;
    return <Container hasMainTag={hasMainTag}>{result}</Container>;
  },
];
