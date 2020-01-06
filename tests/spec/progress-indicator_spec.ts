/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
// Just importing the default export does not seem to run `customElements.define()`
/* eslint-disable import/no-duplicates */
import { PROGRESS_STEP_STAT } from '../../src/components/progress-indicator/progress-step';
import '../../src/components/progress-indicator/progress-step';
/* eslint-enable import/no-duplicates */

const template = ({
  hasContent = true,
  disabled,
  iconLabel,
  labelText,
  secondaryLabelText,
  state,
}: {
  hasContent?: boolean;
  disabled?: boolean;
  iconLabel?: string;
  labelText?: string;
  secondaryLabelText?: string;
  state?: PROGRESS_STEP_STAT;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-progress-step
          ?disabled="${ifDefined(disabled)}"
          icon-label="${ifDefined(iconLabel)}"
          label-text="${ifDefined(labelText)}"
          secondary-label-text="${ifDefined(secondaryLabelText)}"
          state="${ifDefined(state)}"
        ></bx-progress-step>
      `;

describe('bx-progress-step', function() {
  describe('Rendering', function() {
    it('Should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-progress-step')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        template({
          disabled: true,
          iconLabel: 'icon-label-foo',
          labelText: 'label-text-foo',
          secondaryLabelText: 'secondary-label-text-foo',
          state: PROGRESS_STEP_STAT.COMPLETE,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-progress-step')).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(async function() {
      await render(template({ hasContent: false }), document.body);
    });
  });
});
