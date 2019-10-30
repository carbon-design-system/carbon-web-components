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
import './code-snippet';

const createProps = () => ({
  codeAssistiveText: text('Assistive text for the code portion (code-assistive-text)', ''),
  copyButtonAssistiveText: text('Assistive text for the copy button (copy-button-assistive-text)', ''),
  copyButtonFeedbackText: text('Feedback text for copy button (copy-button-feedback-text)', ''),
  copyButtonFeedbackTimeout: number('Feedback timeout for copy button (copy-buttobn-feedback-timeout)', 2000),
  onClick: action('click'),
});

const createMultilineProps = () => ({
  collapseButtonText: text('The text for the collapse button (collapse-button-text)', ''),
  expandButtonText: text('The text for the expand button (expand-button-text)', ''),
});

storiesOf('Code snippet', module)
  .addDecorator(withKnobs)
  .add(
    'Single line',
    () => {
      const {
        codeAssistiveText,
        copyButtonAssistiveText,
        copyButtonFeedbackText,
        copyButtonFeedbackTimeout,
        onClick,
      } = createProps();
      return html`
        <bx-code-snippet
          code-assistive-text="${ifDefined(!codeAssistiveText ? undefined : codeAssistiveText)}"
          copy-button-assistive-text="${ifDefined(!copyButtonAssistiveText ? undefined : copyButtonAssistiveText)}"
          copy-button-feedback-text="${ifDefined(!copyButtonFeedbackText ? undefined : copyButtonFeedbackText)}"
          copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
          @click="${onClick}"
          >node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
          officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga
          laboriosam!</bx-code-snippet
        >
      `;
    },
    {
      docs: {
        storyDescription: 'The Terminal style is for single-line.',
      },
    }
  )
  .add(
    'Multi line',
    () => {
      const {
        codeAssistiveText,
        copyButtonAssistiveText,
        copyButtonFeedbackText,
        copyButtonFeedbackTimeout,
        collapseButtonText,
        expandButtonText,
        onClick,
      } = { ...createProps(), ...createMultilineProps() };
      // prettier-ignore
      return html`
      <bx-code-snippet
        type="multi"
        code-assistive-text="${ifDefined(!codeAssistiveText ? undefined : codeAssistiveText)}"
        copy-button-assistive-text="${ifDefined(!copyButtonAssistiveText ? undefined : copyButtonAssistiveText)}"
        copy-button-feedback-text="${ifDefined(!copyButtonFeedbackText ? undefined : copyButtonFeedbackText)}"
        copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
        collapse-button-text="${ifDefined(!collapseButtonText ? undefined : collapseButtonText)}"
        expand-button-text="${ifDefined(!expandButtonText ? undefined : expandButtonText)}"
        @click="${onClick}"
      >@mixin grid-container {
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
);</bx-code-snippet>
    `;
    },
    {
      docs: {
        storyDescription: 'The Code style is for larger, multi-line code snippets.',
      },
    }
  )
  .add(
    'Inline',
    () => {
      const {
        codeAssistiveText,
        copyButtonAssistiveText,
        copyButtonFeedbackText,
        copyButtonFeedbackTimeout,
        onClick,
      } = createProps();
      return html`
        <bx-code-snippet
          type="inline"
          code-assistive-text="${ifDefined(!codeAssistiveText ? undefined : codeAssistiveText)}"
          copy-button-assistive-text="${ifDefined(!copyButtonAssistiveText ? undefined : copyButtonAssistiveText)}"
          copy-button-feedback-text="${ifDefined(!copyButtonFeedbackText ? undefined : copyButtonFeedbackText)}"
          copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
          @click="${onClick}"
          >node -v</bx-code-snippet
        >
      `;
    },
    {
      docs: {
        storyDescription: 'The Inline style is for code used within a block of text.',
      },
    }
  );
