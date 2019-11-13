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
import { action } from '@storybook/addon-actions';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import './copy-button';

const createProps = () => ({
  buttonAssistiveText: text('Assistive text for the button (button-assistive-text)', ''),
  feedbackText: text('Feedback text (feedback-text)', ''),
  feedbackTimeout: number('Feedback timeout (feedback-timeout)', 2000),
  onClick: action('click'),
});

storiesOf('Copy button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { buttonAssistiveText, feedbackText, feedbackTimeout, onClick } = createProps();
    return html`
      <bx-copy-button
        button-assistive-text="${ifDefined(!buttonAssistiveText ? undefined : buttonAssistiveText)}"
        feedback-text="${ifDefined(!feedbackText ? undefined : feedbackText)}"
        feedback-timeout="${feedbackTimeout}"
        @click="${onClick}"
      ></bx-copy-button>
    `;
  });
