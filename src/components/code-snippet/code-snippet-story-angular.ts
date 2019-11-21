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
import './code-snippet';

const createProps = () => ({
  codeAssistiveText: text('Assistive text for the code portion (codeAssistiveText)', ''),
  copyButtonAssistiveText: text('Assistive text for the copy button (copyButtonAssistiveText)', ''),
  copyButtonFeedbackText: text('Feedback text for copy button (copyButtonFeedbackText)', ''),
  copyButtonFeedbackTimeout: number('Feedback timeout for copy button (copyButtobnFeedbackTimeout)', 2000),
  onClick: action('click'),
});

const createMultilineProps = () => ({
  collapseButtonText: text('The text for the collapse button (collapseButtonText)', ''),
  expandButtonText: text('The text for the expand button (expandButtonText)', ''),
});

const multilineCode = `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`;

storiesOf('Code sinppet', module)
  .addDecorator(withKnobs)
  .add(
    'Single line',
    () => ({
      template: `
        <bx-code-snippet
          [codeAssistiveText]="codeAssistiveText"
          [copyButtonAssistiveText]="copyButtonAssistiveText"
          [attr.copyButtonFeedbackText]="copyButtonFeedbackText || null"
          [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
          (click)="onClick($event)"
          >node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
          officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga
          laboriosam!</bx-code-snippet
        >
      `,
      props: createProps(),
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: 'The Terminal style is for single-line.',
      },
    }
  )
  .add(
    'Multi line',
    () => ({
      template: `
        <bx-code-snippet
          type="multi"
          [codeAssistiveText]="codeAssistiveText"
          [copyButtonAssistiveText]="copyButtonAssistiveText"
          [attr.copyButtonFeedbackText]="copyButtonFeedbackText || null"
          [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
          [collapseButtonText]="collapseButtonText"
          [expandButtonText]="expandButtonText"
          (click)="onClick($event)"
          >{{code}}</bx-code-snippet>
      `,
      props: { ...createProps(), ...createMultilineProps(), code: multilineCode },
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: 'The Code style is for larger, multi-line code snippets.',
      },
    }
  )
  .add(
    'Inline',
    () => ({
      template: `
        <bx-code-snippet
          type="inline"
          [codeAssistiveText]="codeAssistiveText"
          [copyButtonAssistiveText]="copyButtonAssistiveText"
          [attr.copyButtonFeedbackText]="copyButtonFeedbackText || null"
          [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
          (click)="onClick($event)"
          >node -v</bx-code-snippet
        >
      `,
      props: createProps(),
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: 'The Inline style is for code used within a block of text.',
      },
    }
  );
