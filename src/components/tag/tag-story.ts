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
import { boolean, select } from '@storybook/addon-knobs';
import TAG_TYPE from './types';
import './tag';
import './filter-tag';

export const defaultStory = ({ parameters }) => {
  const { type, title, disabled } = (parameters.props && parameters.props['bx-tag']) || ({} as typeof parameters.props['bx-tag']);
  return html`
    <bx-tag type=${type} ?title=${title} ?disabled=${disabled}>
      This is not a tag
    </bx-tag>
  `;
};

defaultStory.story = {
  name: 'Default',
  parameters: {
    knobs: {
      'bx-tag': () => ({
        disabled: boolean('Disabled (disabled)', false),
        title: 'Clear Selection',
        type: select(
          'Tag type (type)',
          Object.values(TAG_TYPE).reduce(
            (acc, type) => ({
              ...acc,
              [`${type} (${type})`]: type,
            }),
            {}
          ),
          'red'
        ),
      }),
    },
  },
};

export const filterStory = ({ parameters }) => {
  const { type, title, disabled, onClick } =
    (parameters.props && parameters.props['bx-filter-tag']) || ({} as typeof parameters.props['bx-filter-tag']);
  return html`
    <bx-filter-tag type=${type} ?title=${title} ?disabled=${disabled} @click=${onClick} filter>
      This is not a tag
    </bx-filter-tag>
  `;
};

filterStory.story = {
  name: 'Filter',
  parameters: {
    knobs: {
      'bx-filter-tag': () => ({
        ...defaultStory.story.parameters.knobs['bx-tag'](),
        onClick: action('click'),
      }),
    },
  },
};

export default {
  title: 'Tag',
};
