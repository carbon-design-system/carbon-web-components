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
import { number } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './copy-button';

export const defaultStory = ({ parameters }) => {
  const { buttonAssistiveText, feedbackText, feedbackTimeout, onClick } = parameters?.props?.['bx-copy-button'] ?? {};
  return html`
    <bx-copy-button
      button-assistive-text="${ifNonNull(buttonAssistiveText)}"
      feedback-text="${ifNonNull(feedbackText)}"
      feedback-timeout="${ifNonNull(feedbackTimeout)}"
      @click="${onClick}"
    ></bx-copy-button>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Copy button',
  parameters: {
    knobs: {
      'bx-copy-button': () => ({
        buttonAssistiveText: textNullable('Assistive text for the button (button-assistive-text)', ''),
        feedbackText: textNullable('Feedback text (feedback-text)', ''),
        feedbackTimeout: number('Feedback timeout (feedback-timeout)', 2000),
        onClick: action('click'),
      }),
    },
  },
};
