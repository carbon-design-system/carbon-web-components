/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import TAG_TYPE from './types';
import './tag';
import './filter-tag';

const createDefaultProps = () => ({
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
});

const createFilterProps = () => ({
  ...createDefaultProps(),
  onClick: action('click'),
});

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-tag :type="type" :title="title" :disabled="disabled">
        This is not a tag
      </bx-tag>
    `,
    ...createVueBindingsFromProps(createDefaultProps()),
  }))
  .add('Filter', () => ({
    template: `
      <bx-filter-tag
        :type="type"
        :title="title"
        :disabled="disabled"
        @click="onClick"
      >
        This is not a tag
      </bx-filter-tag:type="type">
    `,
    ...createVueBindingsFromProps(createFilterProps()),
  }));
