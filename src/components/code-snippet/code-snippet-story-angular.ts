/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { singleLine as baseSingleLine, multiLine as baseMultiLine, inline as baseInline } from './code-snippet-story';

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

export const singleLine = ({ parameters }) => ({
  template: `
    <bx-code-snippet
      [codeAssistiveText]="codeAssistiveText"
      [copyButtonAssistiveText]="copyButtonAssistiveText"
      [attr.copy-button-feedback-text]="copyButtonFeedbackText || null"
      [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
      (click)="onClick($event)"
      >node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
      officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga
      laboriosam!</bx-code-snippet
    >
  `,
  props: parameters?.props['bx-code-snippet'],
});

singleLine.story = baseSingleLine.story;

export const multiLine = ({ parameters }) => ({
  template: `
    <bx-code-snippet
      type="multi"
      [codeAssistiveText]="codeAssistiveText"
      [copyButtonAssistiveText]="copyButtonAssistiveText"
      [attr.copy-button-feedback-text]="copyButtonFeedbackText || null"
      [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
      [collapseButtonText]="collapseButtonText"
      [expandButtonText]="expandButtonText"
      (click)="onClick($event)"
      >{{code}}</bx-code-snippet>
  `,
  props: { ...parameters?.props['bx-code-snippet'], code: multilineCode },
});

multiLine.story = baseMultiLine.story;

export const inline = ({ parameters }) => ({
  template: `
    <bx-code-snippet
      type="inline"
      [codeAssistiveText]="codeAssistiveText"
      [copyButtonAssistiveText]="copyButtonAssistiveText"
      [attr.copy-button-feedback-text]="copyButtonFeedbackText || null"
      [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
      (click)="onClick($event)"
      >node -v</bx-code-snippet
    >
  `,
  props: parameters?.props['bx-code-snippet'],
});

inline.story = baseInline.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
