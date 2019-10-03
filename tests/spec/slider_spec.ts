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

const template = ({
  hasContent = true,
  disabled,
  labelText,
  max,
  min,
  name,
  step,
  value,
}: {
  hasContent?: boolean;
  disabled?: boolean;
  labelText?: string;
  max?: number;
  min?: number;
  name?: string;
  step?: number;
  value?: number;
} = {}) =>
  !hasContent
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

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });
});
