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
import { withKnobs, number, text } from '@storybook/addon-knobs/angular';
import './copy-button';

const createProps = () => ({
  buttonAssistiveText: text('Assistive text for the button (buttonAssistiveText)', ''),
  feedbackText: text('Feedback text (feedbackText)', ''),
  feedbackTimeout: number('Feedback timeout (feedbackTimeout)', 2000),
  onClick: action('click'),
});

storiesOf('Copy button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-copy-button
        [buttonAssistiveText]="buttonAssistiveText"
        [attr.feedbackText]="feedbackText || null"
        [feedbackTimeout]="feedbackTimeout"
        (click)="onClick($event)"
      ></bx-copy-button>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
