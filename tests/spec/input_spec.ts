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
import { INPUT_TYPE } from '../../src/components/input/input';

/**
 * @param formData A `FormData` instance.
 * @returns The given `formData` converted to a classic key-value pair.
 */
const getValues = (formData: FormData) => {
  const values = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }
  return values;
};

const template = ({
  hasContent = true,
  hasForm,
  autocomplete,
  autofocus,
  disabled,
  helperText,
  labelText,
  name,
  pattern,
  placeholder,
  readonly,
  required,
  type,
  validityMessage,
  value,
}: {
  hasContent?: boolean;
  hasForm?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  helperText?: string;
  labelText?: string;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  type?: INPUT_TYPE;
  validityMessage?: string;
  value?: string;
} = {}) => {
  const inner = !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-input
          autocomplete="${ifDefined(autocomplete)}"
          ?autofocus="${autofocus}"
          ?disabled="${disabled}"
          helper-text="${ifDefined(helperText)}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          pattern="${ifDefined(pattern)}"
          placeholder="${ifDefined(placeholder)}"
          ?readonly="${readonly}"
          ?required="${required}"
          type="${ifDefined(type)}"
          validity-message="${ifDefined(validityMessage)}"
          value="${ifDefined(value)}"
        ></bx-input>
      `;
  return !hasContent || !hasForm
    ? inner
    : html`
        <form>${inner}</form>
      `;
};

describe('bx-input', function() {
  describe('Rendering', function() {
    it('Should render with various attributes', async function() {
      render(
        template({
          autocomplete: 'on',
          autofocus: true,
          disabled: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          name: 'name-foo',
          pattern: 'pattern-foo',
          placeholder: 'placeholder-foo',
          readonly: true,
          required: true,
          type: INPUT_TYPE.TEXT,
          validityMessage: 'validity-message-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-input')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Event-based form participation', function() {
    it('Should respond to `formdata` event', async function() {
      render(
        template({
          hasForm: true,
          name: 'name-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': 'value-foo' });
    });

    it('Should not respond to `formdata` event if disabled', async function() {
      render(
        template({
          hasForm: true,
          disabled: true,
          name: 'name-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });
  });

  afterEach(async function() {
    await render(template({ hasContent: false }), document.body);
  });
});
