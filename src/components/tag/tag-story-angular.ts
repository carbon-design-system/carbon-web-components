/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/angular';
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
      <bx-tag [type]="type" [title]="title" [disabled]="disabled">
        This is not a tag
      </bx-tag>
    `,
    props: createDefaultProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }))
  .add('Filter', () => ({
    template: `
      <bx-filter-tag
        [type]="type"
        [title]="title"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        This is not a tag
      </bx-filter-tag>
    `,
    props: createFilterProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
