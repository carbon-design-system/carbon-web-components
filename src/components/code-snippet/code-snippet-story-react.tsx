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
import BXCodeSnippet from 'carbon-custom-elements/es/components-react/code-snippet/code-snippet';

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
      return (
        <BXCodeSnippet
          codeAssistiveText={codeAssistiveText}
          copyButtonAssistiveText={copyButtonAssistiveText}
          copyButtonFeedbackText={copyButtonFeedbackText || undefined}
          copyButtonFeedbackTimeout={copyButtonFeedbackTimeout}
          onClick={onClick}>
          {'node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
            'Blanditiis, veritatis voluptate id incidunt molestiae officia possimus, ' +
            'quasi itaque alias, architecto hic, dicta fugit? ' +
            'Debitis delectus quidem explicabo vitae fuga laboriosam!'}
        </BXCodeSnippet>
      );
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
      return (
        <BXCodeSnippet
          type="multi"
          codeAssistiveText={codeAssistiveText}
          copyButtonAssistiveText={copyButtonAssistiveText}
          copyButtonFeedbackText={copyButtonFeedbackText || undefined}
          copyButtonFeedbackTimeout={copyButtonFeedbackTimeout}
          collapseButtonText={collapseButtonText}
          expandButtonText={expandButtonText}
          onClick={onClick}>{`@mixin grid-container {
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
);`}</BXCodeSnippet>
      );
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
      return (
        <BXCodeSnippet
          type="inline"
          codeAssistiveText={codeAssistiveText}
          copyButtonAssistiveText={copyButtonAssistiveText}
          copyButtonFeedbackText={copyButtonFeedbackText || undefined}
          copyButtonFeedbackTimeout={copyButtonFeedbackTimeout}
          onClick={onClick}>
          node -v
        </BXCodeSnippet>
      );
    },
    {
      docs: {
        storyDescription: 'The Inline style is for code used within a block of text.',
      },
    }
  );
