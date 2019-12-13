/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit-html';
import pick from 'lodash-es/pick';
import flatpickr from 'flatpickr';
// Just importing the default export does not seem to run `customElements.define()`
/* eslint-disable import/no-duplicates */
import '../../src/components/date-picker/date-picker';
import BXDatePicker from '../../src/components/date-picker/date-picker';
import '../../src/components/date-picker/date-picker-input';
import BXDatePickerInput from '../../src/components/date-picker/date-picker-input';
/* eslint-enable import/no-duplicates */

const inputTemplate = ({
  mode = 'simple',
  disabled,
  hideLabel,
  labelText = '',
  light,
  onInput,
}: {
  mode?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  labelText?: string;
  light?: boolean;
  onInput: EventListener;
}) => {
  if (mode === 'single') {
    return html`
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        kind="single"
        label-text="${labelText}"
        ?light="${light}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
    `;
  }
  if (mode === 'range') {
    return html`
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        kind="from"
        label-text="${labelText}"
        ?light="${light}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        kind="to"
        label-text="${labelText}"
        ?light="${light}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
    `;
  }
  return html`
    <bx-date-picker-input ?disabled="${disabled}" ?hide-label="${hideLabel}" label-text="${labelText}" ?light="${light}">
    </bx-date-picker-input>
  `;
};

const template = ({
  hasContent = true,
  mode = 'simple',
  enabledRange = '',
  open,
  value = '',
  disabled,
  hideLabel,
  labelText = '',
  light,
  onAfterChanged = () => {},
  onInput = () => {},
}: {
  hasContent?: boolean;
  mode?: string;
  enabledRange?: string;
  open?: boolean;
  value?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  labelText?: string;
  light?: boolean;
  onAfterChanged?: EventListener;
  onInput?: EventListener;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-date-picker
          enabled-range="${enabledRange}"
          ?open="${open}"
          value="${value}"
          @bx-date-picker-changed="${onAfterChanged}"
        >
          ${inputTemplate({
            mode,
            disabled,
            hideLabel,
            labelText,
            light,
            onInput,
          })}
        </bx-date-picker>
      `;

describe('bx-date-picker', function() {
  describe('Simple mode', function() {
    let datePicker: BXDatePicker | null;

    beforeEach(async function() {
      render(template({ mode: 'simple' }), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
    });

    it('Should not instantiate Flatpickr', async function() {
      const { calendar } = datePicker!;
      expect(calendar).toBeFalsy();
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });

  describe('Single mode', function() {
    let datePicker: BXDatePicker | null;
    let datePickerInput: BXDatePickerInput | null;

    beforeEach(async function() {
      render(template({ mode: 'single' }), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
      datePickerInput = document.body.querySelector('bx-date-picker-input');
    });

    it('Should instantiate Flatpickr', async function() {
      const { calendar } = datePicker!;
      expect(calendar).toBeTruthy();
      const { config, loadedPlugins } = datePicker!.calendar!;
      expect(pick(config, ['allowInput', 'appendTo', 'dateFormat', 'locale', 'maxDate', 'minDate', 'positionElement'])).toEqual({
        allowInput: true,
        appendTo: datePicker!.shadowRoot!.getElementById('floating-menu-container')!,
        dateFormat: 'm/d/Y',
        locale: flatpickr.l10ns.default,
        maxDate: undefined,
        minDate: undefined,
        positionElement: datePickerInput!.input,
      });
      expect(loadedPlugins.sort()).toEqual([
        'carbonFlatpickrAppendToPlugin',
        'carbonFlatpickrCSSClassPlugin',
        'carbonFlatpickrFixEventsPlugin',
        'carbonFlatpickrFocusPlugin',
        'carbonFlatpickrIconPlugin',
        'carbonFlatpickrMonthSelectPlugin',
        'carbonFlatpickrShadowDOMEventsPlugin',
        'carbonFlatpickrStateHandshakePlugin',
      ]);
    });

    it('Should support programmatic change of the date', async function() {
      datePicker!.value = '2000-07-15';
      await Promise.resolve();
      expect(datePicker!.calendar!.selectedDates.map(item => item.getTime())).toEqual([new Date(2000, 6, 15).getTime()]);
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });

  describe('Range mode', function() {
    let datePicker: BXDatePicker | null;
    let datePickerInputStart: BXDatePickerInput | null;

    beforeEach(async function() {
      render(template({ mode: 'range' }), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
      datePickerInputStart = document.body.querySelector('bx-date-picker-input[kind="from"]');
    });

    it('Should instantiate Flatpickr', async function() {
      const { calendar } = datePicker!;
      expect(calendar).toBeTruthy();
      const { config, loadedPlugins } = datePicker!.calendar!;
      expect(pick(config, ['allowInput', 'appendTo', 'dateFormat', 'locale', 'maxDate', 'minDate', 'positionElement'])).toEqual({
        allowInput: true,
        appendTo: datePicker!.shadowRoot!.getElementById('floating-menu-container')!,
        dateFormat: 'm/d/Y',
        locale: flatpickr.l10ns.default,
        maxDate: undefined,
        minDate: undefined,
        positionElement: datePickerInputStart!.input,
      });
      expect(loadedPlugins.sort()).toEqual([
        'carbonFlatpickrAppendToPlugin',
        'carbonFlatpickrCSSClassPlugin',
        'carbonFlatpickrFixEventsPlugin',
        'carbonFlatpickrFocusPlugin',
        'carbonFlatpickrIconPlugin',
        'carbonFlatpickrMonthSelectPlugin',
        'carbonFlatpickrShadowDOMEventsPlugin',
        'carbonFlatpickrStateHandshakePlugin',
        'range',
      ]);
    });

    it('Should support programmatic change of the date', async function() {
      datePicker!.value = '2000-07-10/2000-07-20';
      await Promise.resolve();
      expect(datePicker!.calendar!.selectedDates.map(item => item.getTime())).toEqual([
        new Date(2000, 6, 10).getTime(),
        new Date(2000, 6, 20).getTime(),
      ]);
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });
});
