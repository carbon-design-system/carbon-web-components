/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import pick from 'lodash-es/pick';
import flatpickr from 'flatpickr';
import BXDatePicker from '../../src/components/date-picker/date-picker';
import BXDatePickerInput from '../../src/components/date-picker/date-picker-input';
import { defaultStory, singleWithCalendar, rangeWithCalendar } from '../../src/components/date-picker/date-picker-story';

const defaultTemplate = (props?) =>
  defaultStory({
    parameters: {
      props,
    },
  });

const singleWithCalendarTemplate = (props?) =>
  singleWithCalendar({
    parameters: {
      props,
    },
  });

const rangeWithCalendarTemplate = (props?) =>
  rangeWithCalendar({
    parameters: {
      props,
    },
  });

describe('bx-date-picker', function() {
  describe('Simple mode', function() {
    let datePicker: BXDatePicker | null;

    beforeEach(async function() {
      render(defaultTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
    });

    it('Should not instantiate Flatpickr', async function() {
      const { calendar } = datePicker!;
      expect(calendar).toBeFalsy();
    });
  });

  describe('Single mode', function() {
    let datePicker: BXDatePicker | null;
    let datePickerInput: BXDatePickerInput | null;

    beforeEach(async function() {
      render(singleWithCalendarTemplate(), document.body);
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
  });

  describe('Range mode', function() {
    let datePicker: BXDatePicker | null;
    let datePickerInputStart: BXDatePickerInput | null;

    beforeEach(async function() {
      render(rangeWithCalendarTemplate(), document.body);
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
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
