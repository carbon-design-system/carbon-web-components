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
import { withKnobs, number, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import './copy-button';

const createProps = () => ({
  buttonAssistiveText: text('Assistive text for the button (button-assistive-text)', ''),
  feedbackText: text('Feedback text (feedback-text)', ''),
  feedbackTimeout: number('Feedback timeout (feedback-timeout)', 2000),
  onClick: action('click'),
});

storiesOf('Copy button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-copy-button
        :button-assistive-text="buttonAssistiveText"
        :feedback-text="feedbackText || undefined"
        :feedback-timeout="feedbackTimeout"
        @click="onClick"
      ></bx-copy-button>
    `,
    ...createVueBindingsFromProps(createProps()),
  }));
