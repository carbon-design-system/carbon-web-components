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
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import './progress-indicator';
import './progress-step';

const createProps = () => ({
  vertical: boolean('Vertical (vertical)', false),
});

const createStepProps = () => ({
  iconLabel: text('Icon label (icon-label)', ''),
  labelText: text('Primary label text (label-text)', 'Label'),
  secondaryLabelText: text('Secondary label text (secondary-label-text)', 'Secondary label'),
});

storiesOf('Progress indicator', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-progress-indicator
        [vertical]="vertical"
      >
        <bx-progress-step
          [iconLabel]="iconLabel"
          [labelText]="labelText"
          [secondaryLabelText]="secondaryLabelText"
          state="invalid"
        ></bx-progress-step>
        <bx-progress-step
          [iconLabel]="iconLabel"
          [labelText]="labelText"
          [secondaryLabelText]="secondaryLabelText"
          state="complete"
        ></bx-progress-step>
        <bx-progress-step
          [iconLabel]="iconLabel"
          [labelText]="labelText"
          [secondaryLabelText]="secondaryLabelText"
          state="current"
        ></bx-progress-step>
        <bx-progress-step
          disabled
          [iconLabel]="iconLabel"
          [labelText]="labelText"
          [secondaryLabelText]="secondaryLabelText"
        ></bx-progress-step>
        <bx-progress-step
          [iconLabel]="iconLabel"
          [labelText]="labelText"
          [secondaryLabelText]="secondaryLabelText"
        ></bx-progress-step>
      </bx-progress-indicator>
    `,
    props: { ...createProps(), ...createStepProps() },
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
