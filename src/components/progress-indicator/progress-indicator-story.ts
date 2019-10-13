/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
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
  .add('Default', () => {
    const { vertical } = createProps();
    const { iconLabel, labelText, secondaryLabelText } = createStepProps();
    return html`
      <bx-progress-indicator ?vertical="${vertical}">
        <bx-progress-step
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          label-text="${ifDefined(!labelText ? undefined : labelText)}"
          secondary-label-text="${ifDefined(!secondaryLabelText ? undefined : secondaryLabelText)}"
          state="invalid"
        ></bx-progress-step>
        <bx-progress-step
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          label-text="${ifDefined(!labelText ? undefined : labelText)}"
          secondary-label-text="${ifDefined(!secondaryLabelText ? undefined : secondaryLabelText)}"
          state="complete"
        ></bx-progress-step>
        <bx-progress-step
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          label-text="${ifDefined(!labelText ? undefined : labelText)}"
          secondary-label-text="${ifDefined(!secondaryLabelText ? undefined : secondaryLabelText)}"
          state="current"
        ></bx-progress-step>
        <bx-progress-step
          disabled
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          label-text="${ifDefined(!labelText ? undefined : labelText)}"
          secondary-label-text="${ifDefined(!secondaryLabelText ? undefined : secondaryLabelText)}"
        ></bx-progress-step>
        <bx-progress-step
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          label-text="${ifDefined(!labelText ? undefined : labelText)}"
          secondary-label-text="${ifDefined(!secondaryLabelText ? undefined : secondaryLabelText)}"
        ></bx-progress-step>
      </bx-progress-indicator>
    `;
  });
