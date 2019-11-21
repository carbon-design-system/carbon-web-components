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
  hasForm?: boolean;
  checked?: boolean;
  checkedText?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  name?: string;
  value?: string;
  uncheckedText?: string;
} = {}) => {
  const inner = !hasContent
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
  return !hasContent || !hasForm
    ? inner
    : html`
        <form>${inner}</form>
      `;
};

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
  });

  describe('Event-based form participation', function() {
    it('Should respond to `formdata` event', async function() {
      render(
        template({
          hasForm: true,
          checked: true,
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

    it('Should respond to `formdata` event with default value', async function() {
      render(
        template({
          hasForm: true,
          checked: true,
          name: 'name-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': 'on' });
    });

    it('Should not respond to `formdata` event if unchecked', async function() {
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
      expect(getValues(formData)).toEqual({});
    });

    it('Should not respond to `formdata` event if disabled', async function() {
      render(
        template({
          hasForm: true,
          disabled: true,
          checked: true,
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

  afterEach(function() {
    render(template({ hasContent: false }), document.body);
  });
});
