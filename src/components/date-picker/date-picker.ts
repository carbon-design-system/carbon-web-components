/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import flatpickr from 'flatpickr';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Locale as FlatpickrLocale } from 'flatpickr/dist/types/locale';
import { Options as FlatpickrOptions } from 'flatpickr/dist/types/options';
import settings from 'carbon-components/es/globals/js/settings';
import BXDatePickerInput from './date-picker-input';
import cssClassPlugin from './css-class-plugin';
import iconPlugin from './icon-plugin';
import monthSelectPlugin from './month-select-plugin';
import stateHandshakePlugin from './state-handshake-plugin';
import styles from './date-picker.scss';

const { prefix } = settings;

/**
 * Date picker.
 */
@customElement(`${prefix}-date-picker`)
class BXDatePicker extends LitElement {
  private _dateInteractNode: BXDatePickerInput | null = null;

  private get _datePickerOptions(): FlatpickrOptions {
    const {
      classCalendarContainer,
      classMonth,
      classWeekdays,
      classDays,
      classWeekday,
      classDay,
      classNoBorder,
      defaultDateFormat,
      _selectorFlatpickrMonthYearContainer: selectorFlatpickrMonthYearContainer,
      _selectorFlatpickrYearContainer: selectorFlatpickrYearContainer,
      _selectorFlatpickrCurrentMonth: selectorFlatpickrCurrentMonth,
      _selectorFlatpickrMonth: selectorFlatpickrMonth,
      _selectorFlatpickrWeekdays: selectorFlatpickrWeekdays,
      _selectorFlatpickrDays: selectorFlatpickrDays,
      _selectorFlatpickrWeekday: selectorFlatpickrWeekday,
      _selectorFlatpickrDay: selectorFlatpickrDay,
      _classFlatpickrCurrentMonth: classFlatpickrCurrentMonth,
      _classFlatpickrToday: classFlatpickrToday,
    } = this.constructor as typeof BXDatePicker;
    const {
      locale = (this.constructor as typeof BXDatePicker).defaultLocale,
      maxDate,
      minDate,
      _dateInteractNode: dateInteractNode,
    } = this;
    const dateFormat = this.dateFormat == null ? defaultDateFormat : this.dateFormat;
    // We use `<bx-date-picker-input>` to communicate values/events with Flatpickr,
    // but want to use `<input>` in shadow DOM base the calendar dropdown's position on
    const { input: positionElement } = dateInteractNode!;
    return {
      allowInput: true,
      appendTo: this.shadowRoot as any, // `.d.ts` for Flatpickr uses `HTMLElement` for `appendTo`, but `ShadowRoot` works, too
      dateFormat,
      locale,
      maxDate,
      minDate,
      prevArrow: '',
      nextArrow: '',
      positionElement,
      plugins: [
        cssClassPlugin({
          classCalendarContainer,
          classMonth,
          classWeekdays,
          classDays,
          classWeekday,
          classDay,
          classNoBorder,
          selectorFlatpickrMonth,
          selectorFlatpickrWeekdays,
          selectorFlatpickrDays,
          selectorFlatpickrWeekday,
          selectorFlatpickrDay,
          classFlatpickrToday,
        }),
        iconPlugin(),
        monthSelectPlugin({
          selectorFlatpickrMonthYearContainer,
          selectorFlatpickrYearContainer,
          selectorFlatpickrCurrentMonth,
          classFlatpickrCurrentMonth,
        }),
        stateHandshakePlugin(this),
      ],
    };
  }

  /**
   * Handles `keydown` event in the `<slot>`.
   */
  private _handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    const { calendar } = this;
    if (calendar) {
      const { calendarContainer, selectedDateElem, todayDateElem } = calendar;
      if (key === 'Down' || key === 'ArrowDown') {
        event.preventDefault();
        (selectedDateElem || todayDateElem || calendarContainer).focus();
      }
    }
  }

  /**
   * Handles `slotchange` event in the `<slot>`.
   */
  private _handleSlotChange({ target }: Event) {
    const { _dateInteractNode: oldDateInteractNode } = this;
    const dateInteractNode = (target as HTMLSlotElement)
      .assignedNodes()
      .find(
        node =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).matches((this.constructor as typeof BXDatePicker).selectorInputFrom)
      );
    if (oldDateInteractNode !== dateInteractNode) {
      this._dateInteractNode = dateInteractNode as BXDatePickerInput;
      this._instantiateDatePicker();
    }
  }

  private _instantiateDatePicker() {
    this._releaseDatePicker();
    const { _dateInteractNode: dateInteractNode } = this;
    if (dateInteractNode && dateInteractNode.input) {
      this.calendar = flatpickr(dateInteractNode as any, this._datePickerOptions);
    }
    return this.calendar;
  }

  private _releaseDatePicker() {
    if (this.calendar) {
      this.calendar.destroy();
      this.calendar = null;
    }
    return this.calendar;
  }

  /**
   * The Flatpickr instance.
   */
  calendar: FlatpickrInstance | null = null;

  /**
   * The date format to use.
   */
  @property()
  dateFormat!: string;

  /**
   * The localization data.
   */
  @property({ attribute: false })
  locale!: FlatpickrLocale;

  /**
   * The maximum date that a user can pick to.
   */
  @property()
  maxDate!: string;

  /**
   * The minimum date that a user can start picking from.
   */
  @property()
  minDate!: string;

  /**
   * `true` if the date picker should be open. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  connectedCallback() {
    super.connectedCallback();
    this._instantiateDatePicker();
  }

  disconnectedCallback() {
    this._releaseDatePicker();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if ((changedProperties.has('maxDate'), changedProperties.has('minDate'))) {
      // TODO: See if we can simply update Flatpickr's property for this purpose
      // Ref: https://github.com/carbon-design-system/carbon/issues/2500
      this._instantiateDatePicker();
    }
    const { calendar, open } = this;
    if (changedProperties.has('open') && calendar) {
      if (open) {
        calendar.open();
      } else {
        calendar.close();
      }
    }
  }

  render() {
    const { _handleKeydown: handleKeydown, _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @keydown="${handleKeydown}" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * The CSS selector for Flatpickr's month/year portion.
   */
  private static _selectorFlatpickrMonthYearContainer = '.flatpickr-current-month';

  /**
   * The CSS selector for Flatpickr's year portion.
   */
  private static _selectorFlatpickrYearContainer = '.numInputWrapper';

  /**
   * The CSS selector for the inner element of Flatpickr's month portion.
   */
  private static _selectorFlatpickrCurrentMonth = '.cur-month';

  /**
   * The CSS selector for Flatpickr's month navigator.
   */
  private static _selectorFlatpickrMonth = '.flatpickr-month';

  /**
   * The CSS selector for Flatpickr's container of the weekdays.
   */
  private static _selectorFlatpickrWeekdays = '.flatpickr-weekdays';

  /**
   * The CSS selector for Flatpickr's container of the days.
   */
  private static _selectorFlatpickrDays = '.flatpickr-days';

  /**
   * The CSS selector applied to Flatpickr's each weekdays.
   */
  private static _selectorFlatpickrWeekday = '.flatpickr-weekday';

  /**
   * The CSS selector applied to Flatpickr's each days.
   */
  private static _selectorFlatpickrDay = '.flatpickr-day';

  /**
   * The CSS class for the inner element of Flatpickr's month portion.
   */
  private static _classFlatpickrCurrentMonth = 'cur-month';

  /**
   * The CSS class applied to Flatpickr's "today" highlight.
   */
  private static _classFlatpickrToday = 'today';

  /**
   * The CSS class for the calendar dropdown.
   */
  static get classCalendarContainer() {
    return `${prefix}--date-picker__calendar`;
  }

  /**
   * The CSS class for the month navigator.
   */
  static get classMonth() {
    return `${prefix}--date-picker__month`;
  }

  /**
   * The CSS class for the container of the weekdays.
   */
  static get classWeekdays() {
    return `${prefix}--date-picker__weekdays`;
  }

  /**
   * The CSS class for the container of the days.
   */
  static get classDays() {
    return `${prefix}--date-picker__days`;
  }

  /**
   * The CSS class applied to each weekdays.
   */
  static get classWeekday() {
    return `${prefix}--date-picker__weekday`;
  }

  /**
   * The CSS class applied to each days.
   */
  static get classDay() {
    return `${prefix}--date-picker__day`;
  }

  /**
   * The CSS class applied to the "today" highlight if there are any dates selected.
   */
  static classNoBorder = 'no-border';

  /**
   * The default date format.
   */
  static defaultDateFormat = 'm/d/Y';

  /**
   * The default localization data.
   */
  static defaultLocale = flatpickr.l10ns.default;

  /**
   * A selector that will return the `<input>` to enter starting date.
   */
  static get selectorInputFrom() {
    return `${prefix}-date-picker-input[kind="single"],${prefix}-date-picker-input[kind="from"]`;
  }

  /**
   * The name of the custom event fired once the shadow DOM content if `<bx-date-picker-input>` is ready.
   */
  static get eventInputContentLoaded() {
    return `${prefix}-date-picker-input-content-loaded`;
  }

  static styles = styles;
}

export default BXDatePicker;
