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
import '../../src/components/textarea/textarea';
import BXTextarea from '../../src/components/textarea/textarea';
/* eslint-enable import/no-duplicates */

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
  validityMessage?: string;
  value?: string;
} = {}) => {
  const inner = !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-textarea
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
          validity-message="${ifDefined(validityMessage)}"
          value="${ifDefined(value)}"
        ></bx-textarea>
      `;
  return !hasContent || !hasForm
    ? inner
    : html`
        <form>${inner}</form>
      `;
};

describe('bx-textarea', function() {
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
          validityMessage: 'validity-message-foo',
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-textarea')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should reflect value in DOM', async function() {
      render(
        template({
          value: 'value-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect((document.body.querySelector('bx-textarea') as BXTextarea).value).toBe('value-foo');
    });
  });

  describe('Reacting to user gesture', function() {
    it('Should update value upon user input', async function() {
      render(
        template({
          value: '',
        }),
        document.body
      );
      await Promise.resolve();
      const textareaNode = document.body.querySelector('bx-textarea')!.shadowRoot!.querySelector('textarea');
      expect(textareaNode!.value).toBe('');
      textareaNode!.value = 'value-foo';
      textareaNode!.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      expect(textareaNode!.value).toBe('value-foo');
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
