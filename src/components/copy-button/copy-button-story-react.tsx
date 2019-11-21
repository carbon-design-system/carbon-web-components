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
import { withKnobs, number, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXCopyButton from 'carbon-custom-elements/es/components-react/copy-button/copy-button';

const createProps = () => ({
  buttonAssistiveText: text('Assistive text for the button (buttonAssistiveText)', ''),
  feedbackText: text('Feedback text (feedbackText)', ''),
  feedbackTimeout: number('Feedback timeout (feedbackTimeout)', 2000),
  onClick: action('click'),
});

storiesOf('Copy button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { buttonAssistiveText, feedbackText, feedbackTimeout, onClick } = createProps();
    return (
      <BXCopyButton
        buttonAssistiveText={buttonAssistiveText}
        feedbackText={feedbackText || undefined}
        feedbackTimeout={feedbackTimeout}
        onClick={onClick}
      />
    );
  });
