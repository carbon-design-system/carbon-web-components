/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import throttle from 'lodash-es/throttle';
import { html, property, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import ifNonNull from '../../globals/directives/if-non-null';
import Handle from '../../globals/internal/handle';
import BXSliderInput from './slider-input';
import styles from './slider.scss';

const { prefix } = settings;

interface Cancelable {
  cancel(): void;
}

/**
 * The direction to move the thumb, associated with key symbols.
 */
const THUMB_DIRECTION = {
  Left: -1,
  ArrowLeft: -1,
  Up: -1,
  ArrowUp: -1,
  Right: 1,
  ArrowRight: 1,
  Down: 1,
  ArrowDown: 1,
};

/**
 * Slider.
 */
@customElement(`${prefix}-slider`)
class BXSlider extends HostListenerMixin(FormMixin(FocusMixin(LitElement))) {
  /**
   * The handle for the listener of `${prefix}-slider-input` event.
   */
  private _hChangeInput: Handle | null = null;

  /**
   * The handle for the throttled listener of `mousemove` event.
   */
  private _throttledHandleMousemoveImpl: (((event: Event) => void) & Cancelable) | null = null;

  /**
   * `true` if dragging of thumb is in progress.
   */
  private _dragging = false;

  /**
   * The rate of the thumb position in the track.
   * When we try to set a new value, we adjust the value considering `step` property.
   */
  private get _rate() {
    const { max, min, value } = this;
    // Copes with out-of-range value coming programmatically or from `<bx-slider-input>`
    return Math.min(max, Math.max(min, value)) / (max - min);
  }

  private set _rate(rate: number) {
    const { max, min, step } = this;
    this.value = min + Math.round(((max - min) * Math.min(1, Math.max(0, rate))) / step) * step;
  }

  /**
   * The DOM element of the thumb.
   */
  @query('#thumb')
  private _thumbNode!: HTMLDivElement;

  /**
   * The DOM element of the track.
   */
  @query('#track')
  private _trackNode!: HTMLDivElement;

  /**
   * Handles `click` event on the `<label>` to focus on the thumb.
   */
  _handleClickLabel() {
    this._thumbNode?.focus();
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, String(value));
    }
  }

  /**
   * Handles `keydown` event on the thumb to increase/decrease the value.
   */
  private _handleKeydownThumb({ key, shiftKey }: KeyboardEvent) {
    if (!this.disabled) {
      if (key in THUMB_DIRECTION) {
        const { max, min, step, stepRatio } = this;
        this.value += (!shiftKey ? step : (max - min) / stepRatio) * THUMB_DIRECTION[key];
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof BXSlider).eventAfterChange, {
            bubbles: true,
            composed: true,
            detail: {
              value: this.value,
              intermediate: false,
            },
          })
        );
      }
    }
  }

  /**
   * Handles `mousedown` event on the thumb to start dragging.
   */
  private _handleMousedownThumb() {
    this._dragging = true;
  }

  /**
   * Handles `mousedown` event on the track to update the thumb position and the value as necessary.
   */
  private _handleMousedownTrack(event: MouseEvent) {
    if (!this.disabled) {
      const thumbLeft = event.clientX;
      const { left: trackLeft, width: trackWidth } = this._trackNode.getBoundingClientRect();
      this._rate = (thumbLeft - trackLeft) / trackWidth;
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof BXSlider).eventAfterChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
          },
        })
      );
    }
  }

  /**
   * Handles `mousemove` event on the `document` to update the thumb position and the value as necessary.
   * @param event The event.
   */
  @HostListener('document:mousemove')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMousemove = (event: MouseEvent) => {
    const { disabled, _dragging: dragging } = this;
    if (!disabled && dragging) {
      this._throttledHandleMousemoveImpl!(event);
    }
  };

  /**
   * Updates thumb position and value upon user's `mousemove` gesture.
   * @param event The event.
   */
  private _handleMousemoveImpl(event: MouseEvent) {
    const { disabled, _dragging: dragging } = this;
    if (!disabled && dragging) {
      const thumbLeft = event.clientX;
      const { left: trackLeft, width: trackWidth } = this._trackNode.getBoundingClientRect();
      this._rate = (thumbLeft - trackLeft) / trackWidth;
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof BXSlider).eventAfterChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
            intermediate: true,
          },
        })
      );
    }
  }

  /**
   * Handles `mouseup` event on the `document` to finishing dragging.
   */
  @HostListener('document:mouseup')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMouseup = () => {
    if (this._dragging) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof BXSlider).eventAfterChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
          },
        })
      );
      this._dragging = false;
    }
  };

  /**
   * Handles `${prefix}-slider-input-changed` event to update the value.
   */
  private _handleChangeInput = ({ detail }: CustomEvent) => {
    const { intermediate, value } = detail;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXSlider).eventAfterChange, {
        bubbles: true,
        composed: true,
        detail: {
          value,
          intermediate,
        },
      })
    );
  };

  /**
   * `true` if the check box should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The formatter for the text for maximum value.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatMaxText = ({ max }) => String(max);

  /**
   * The formatter for the text for minimum value.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatMinText = ({ min }) => String(min);

  /**
   * The label text. Corresponds to `label-text` attribute.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The maximum value.
   */
  @property({ type: Number })
  max = 100;

  /**
   * The minimum value.
   */
  @property({ type: Number })
  min = 0;

  /**
   * The form name. Corresponds to the attribute with the same name.
   */
  @property()
  name!: string;

  /**
   * The snapping step of the value. Corresponds to the attribute with the same name.
   */
  @property({ type: Number })
  step = 1;

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepRatio`.
   * Corresponds to `step-ratio` attribute.
   */
  @property({ type: Number, attribute: 'step-ratio' })
  stepRatio = 4;

  /**
   * The value. Corresponds to the attribute with the same name.
   */
  @property({ type: Number })
  value = 50;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._throttledHandleMousemoveImpl) {
      this._throttledHandleMousemoveImpl = throttle(this._handleMousemoveImpl, 10);
    }
    // Manually hooks the event listeners on the host element to make the event names configurable
    this._hChangeInput = on(
      this,
      (this.constructor as typeof BXSlider).eventAfterChangeInput,
      this._handleChangeInput as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hChangeInput) {
      this._hChangeInput = this._hChangeInput.release();
    }
    if (this._throttledHandleMousemoveImpl) {
      this._throttledHandleMousemoveImpl.cancel();
      this._throttledHandleMousemoveImpl = null;
    }
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    const input = this.querySelector((this.constructor as typeof BXSlider).selectorInput) as BXSliderInput;
    if (changedProperties.has('disabled')) {
      if (input) {
        input.disabled = this.disabled;
      }
      if (this.disabled) {
        this._dragging = false;
      }
    }
    if (input) {
      ['max', 'min', 'value'].forEach(name => {
        if (changedProperties.has(name)) {
          input[name] = this[name];
        }
      });
    }
    return true;
  }

  render() {
    const {
      disabled,
      formatMaxText,
      formatMinText,
      labelText,
      max,
      min,
      name,
      value,
      _rate: rate,
      _handleClickLabel: handleClickLabel,
      _handleKeydownThumb: handleKeydownThumb,
      _handleMousedownTrack: handleMousedownTrack,
      _handleMousedownThumb: handleMousedownThumb,
    } = this;
    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });
    const sliderClasses = classMap({
      [`${prefix}--slider`]: true,
      [`${prefix}--slider--disabled`]: disabled,
    });
    return html`
      <label class="${labelClasses}" @click="${handleClickLabel}">
        <slot name="label-text">${labelText}</slot>
      </label>
      <div class="${prefix}--slider-container">
        <span class="${prefix}--slider__range-label">
          <slot name="min-text">${formatMinText({ min })}</slot>
        </span>
        <div class="${sliderClasses}" role="presentation" tabindex="-1">
          <div
            id="thumb"
            class="${prefix}--slider__thumb"
            role="slider"
            tabindex="0"
            aria-valuemax="${max}"
            aria-valuemin="${min}"
            aria-valuenow="${value}"
            style="left: ${rate * 100}%"
            @keydown="${handleKeydownThumb}"
            @mousedown="${handleMousedownThumb}"
          ></div>
          <div id="track" class="${prefix}--slider__track" @mousedown="${handleMousedownTrack}"></div>
          <div class="${prefix}--slider__filled-track" style="transform: translate(0%, -50%) scaleX(${rate})"></div>
          <input
            class="${prefix}--slider__input"
            type="hidden"
            name="${ifNonNull(name)}"
            value="${value}"
            min="${min}"
            max="${max}"
          />
        </div>
        <span class="${prefix}--slider__range-label">
          <slot name="max-text">${formatMaxText({ max })}</slot>
        </span>
        <slot></slot>
      </div>
    `;
  }

  /**
   * A selector that will return the `<input>` box got entering the value directly.
   */
  static get selectorInput() {
    return `${prefix}-slider-input`;
  }

  /**
   * The name of the custom event fired after the value is changed by user gesture.
   */
  static get eventAfterChange() {
    return `${prefix}-slider-changed`;
  }

  /**
   * The name of the custom event fired after the value is changed in `<bx-slider-input>` by user gesture.
   */
  static get eventAfterChangeInput() {
    return `${prefix}-slider-input-changed`;
  }

  static styles = styles;
}

export default BXSlider;
