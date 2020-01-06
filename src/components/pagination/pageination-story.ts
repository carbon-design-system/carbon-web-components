/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import './pagination';
import './page-sizes-select';
import './pages-select';
import storyDocs from './pagination-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { atLastPage, pageSize, start, total, onChangedCurrent, onChangedPageSizesSelect } = parameters?.props?.['bx-pagination'];
  return html`
    <bx-pagination
      ?at-last-page="${atLastPage || undefined}"
      page-size="${pageSize}"
      start="${start}"
      total="${ifNonNull(total)}"
      @bx-pagination-changed-current="${onChangedCurrent}"
      @bx-page-sizes-select-changed="${onChangedPageSizesSelect}"
    >
      <bx-page-sizes-select slot="page-sizes-select">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </bx-page-sizes-select>
      ${total == null
        ? undefined
        : html`
            <bx-pages-select></bx-pages-select>
          `}
    </bx-pagination>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Pagination',
  parameters: {
    docs: storyDocs.parameters.docs,
    knobs: {
      'bx-pagination': () => ({
        atLastPage: boolean('Explicitly state that the user is at the last page (at-last-apge)', false),
        pageSize: number('Number of rows per page (page-size)', 10),
        start: number('Start row index of the current page (start)', 0),
        total: number('Total rows count (total)', 100),
        onChangedCurrent: action('bx-pagination-changed-current'),
        onChangedPageSizesSelect: action('bx-page-sizes-select-changed'),
      }),
    },
  },
};
