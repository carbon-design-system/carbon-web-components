/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXProgressIndicator from 'carbon-custom-elements/es/components-react/progress-indicator/progress-indicator';
// @ts-ignore
import BXProgressStep from 'carbon-custom-elements/es/components-react/progress-indicator/progress-step';

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
    return (
      <BXProgressIndicator vertical={vertical}>
        <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} state="invalid" />
        <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} state="complete" />
        <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} state="current" />
        <BXProgressStep disabled iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} />
        <BXProgressStep iconLabel={iconLabel} labelText={labelText} secondaryLabelText={secondaryLabelText} />
      </BXProgressIndicator>
    );
  });
