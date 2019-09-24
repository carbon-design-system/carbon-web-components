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
import '../../src/components/checkbox/checkbox';
/* eslint-enable import/no-duplicates */

const template = ({
  hasContent = true,
  checked,
  disabled,
  hideLabel,
  id,
  indeterminate,
  labelText,
  name,
  value,
}: {
  hasContent?: boolean;
  checked?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  indeterminate?: boolean;
  labelText?: string;
  name?: string;
  value?: string;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-checkbox
          id="${ifDefined(id)}"
          ?checked="${ifDefined(checked)}"
          ?disabled="${ifDefined(disabled)}"
          ?hide-label="${ifDefined(hideLabel)}"
          ?indeterminate="${ifDefined(indeterminate)}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          value="${ifDefined(value)}"
        ></bx-checkbox>
      `;

describe('bx-checkbox', function() {
  describe('Rendering', function() {
    it('Should render with minimum attributes', async function() {
      render(
        template({
          id: 'id-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-checkbox')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        template({
          id: 'id-foo',
          checked: true,
          disabled: true,
          hideLabel: true,
          indeterminate: true,
          labelText: 'label-text-foo',
          name: 'name-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-checkbox')).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });
});
