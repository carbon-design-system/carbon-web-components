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
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
import BXRadioButtonGroup, {
  RADIO_BUTTON_ORIENTATION,
  // @ts-ignore
} from 'carbon-custom-elements/es/components-react/radio-button/radio-button-group';
// @ts-ignore
import BXRadioButton, { RADIO_BUTTON_LABEL_POSITION } from 'carbon-custom-elements/es/components-react/radio-button/radio-button';

const orientations = {
  [`Horizontal (${RADIO_BUTTON_ORIENTATION.HORIZONTAL})`]: RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  [`Vertical (${RADIO_BUTTON_ORIENTATION.VERTICAL})`]: RADIO_BUTTON_ORIENTATION.VERTICAL,
};

const labelPositions = {
  [`Left (${RADIO_BUTTON_LABEL_POSITION.LEFT})`]: RADIO_BUTTON_LABEL_POSITION.LEFT,
  [`Right (${RADIO_BUTTON_LABEL_POSITION.RIGHT})`]: RADIO_BUTTON_LABEL_POSITION.RIGHT,
};

const createGroupProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  labelPosition: select('Label position (labelPosition)', labelPositions, RADIO_BUTTON_LABEL_POSITION.RIGHT),
  orientation: select('Orientation (orientation)', orientations, RADIO_BUTTON_ORIENTATION.HORIZONTAL),
  name: text('Name (name)', 'radio-group'),
  value: text('Value (value)', ''),
  onAfterChange: action('onAfterChange'),
});

const createProps = () => ({
  hideLabel: boolean('Hide label (hideLabel)', false),
  labelText: text('Label text (labelText)', 'Radio button'),
});

storiesOf('Radio button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { disabled, labelPosition, orientation, name, value, onAfterChange } = createGroupProps();
    const { hideLabel, labelText } = createProps();
    return (
      <BXRadioButtonGroup
        disabled={disabled}
        labelPosition={labelPosition}
        orientation={orientation}
        name={name}
        value={value}
        onAfterChange={onAfterChange}>
        <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="all" />
        <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="cloudFoundry" />
        <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="staging" />
      </BXRadioButtonGroup>
    );
  });
