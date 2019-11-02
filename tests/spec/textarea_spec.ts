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
import BXTextarea from '../../src/components/textarea/textarea';

const template = ({
  hasContent = true,
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
} = {}) =>
  !hasContent
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

  afterEach(function() {
    render(template({ hasContent: false }), document.body);
  });
});
