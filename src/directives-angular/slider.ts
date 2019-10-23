/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NumberValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';
import BXSlider from '../components/slider/slider';

const { prefix } = settings;

@Directive({
  selector: `${prefix}-slider[formControlName],${prefix}-slider[formControl],${prefix}-slider[ngModel]`,
  host: {
    [`(${BXSlider.eventAfterChange})`]: 'onChange($event.detail.value)',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXSliderDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export default class BXSliderDirective extends NumberValueAccessor {}
