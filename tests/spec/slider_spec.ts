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
import '../../src/components/slider/slider';

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
  disabled,
  labelText,
  max,
  min,
  name,
  step,
  value,
}: {
  hasContent?: boolean;
  hasForm?: boolean;
  disabled?: boolean;
  labelText?: string;
  max?: number;
  min?: number;
  name?: string;
  step?: number;
  value?: number;
} = {}) => {
  const inner = !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-slider
          ?disabled="${disabled}"
          label-text="${ifDefined(labelText)}"
          max="${ifDefined(max)}"
          min="${ifDefined(min)}"
          name="${ifDefined(name)}"
          step="${ifDefined(step)}"
          value="${ifDefined(value)}"
        ></bx-slider>
      `;
  return !hasContent || !hasForm
    ? inner
    : html`
        <form>${inner}</form>
      `;
};

describe('bx-slider', function() {
  describe('Rendering', function() {
    it('Should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-slider')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        template({
          disabled: true,
          labelText: 'label-text-foo',
          max: 100,
          min: 0,
          name: 'name-foo',
          step: 5,
          value: 50,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-slider')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Event-based form participation', function() {
    it('Should respond to `formdata` event', async function() {
      render(
        template({
          hasForm: true,
          name: 'name-foo',
          value: 5,
        }),
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', { bubbles: true, cancelable: false, composed: false });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': '5' });
    });

    it('Should not respond to `formdata` event if disabled', async function() {
      render(
        template({
          hasForm: true,
          disabled: true,
          name: 'name-foo',
          value: 5,
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
