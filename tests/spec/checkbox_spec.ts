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
  disabled,
  hideLabel,
  id,
  indeterminate,
  labelText,
  name,
  value,
}: {
  hasContent?: boolean;
  hasForm?: boolean;
  checked?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  indeterminate?: boolean;
  labelText?: string;
  name?: string;
  value?: string;
} = {}) => {
  const inner = !hasContent
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
  return !hasContent || !hasForm
    ? inner
    : html`
        <form>${inner}</form>
      `;
};

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

  afterEach(async function() {
    await render(template({ hasContent: false }), document.body);
  });
});
