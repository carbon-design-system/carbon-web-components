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
import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';
import './copy-button';

export const defaultStory = ({ parameters }) => {
  const { buttonAssistiveText, feedbackText, feedbackTimeout, onClick } =
    (parameters.props && parameters.props['bx-copy-button']) || ({} as typeof parameters.props['bx-copy-button']);
  return html`
    <bx-copy-button
      button-assistive-text="${ifDefined(!buttonAssistiveText ? undefined : buttonAssistiveText)}"
      feedback-text="${ifDefined(!feedbackText ? undefined : feedbackText)}"
      feedback-timeout="${feedbackTimeout}"
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
        buttonAssistiveText: text('Assistive text for the button (button-assistive-text)', ''),
        feedbackText: text('Feedback text (feedback-text)', ''),
        feedbackTimeout: number('Feedback timeout (feedback-timeout)', 2000),
        onClick: action('click'),
      }),
    },
  },
};
