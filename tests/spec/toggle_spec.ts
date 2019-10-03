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
import '../../src/components/toggle/toggle';

const template = ({
  hasContent = true,
  checked,
  checkedText,
  disabled,
  id,
  labelText,
  name,
  value,
  uncheckedText,
}: {
  hasContent?: boolean;
  checked?: boolean;
  checkedText?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  name?: string;
  value?: string;
  uncheckedText?: string;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-toggle
          id="${ifDefined(id)}"
          ?checked="${ifDefined(checked)}"
          checked-text="${ifDefined(checkedText)}"
          ?disabled="${ifDefined(disabled)}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          value="${ifDefined(value)}"
          unchecked-text="${ifDefined(uncheckedText)}"
        ></bx-toggle>
      `;

describe('bx-toggle', function() {
  describe('Rendering', function() {
    it('Should render with minimum attributes', async function() {
      render(
        template({
          id: 'id-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-toggle')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        template({
          id: 'id-foo',
          checked: true,
          checkedText: 'checked-text-foo',
          disabled: true,
          labelText: 'label-text-foo',
          name: 'name-foo',
          value: 'value-foo',
          uncheckedText: 'unchecked-text-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-toggle')).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });
});
